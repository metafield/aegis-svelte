import type { SvelteComponentDev } from 'svelte/internal';
import { writable } from 'svelte/store';
import { Vector } from 'vector2d';
import type {
  GameObject,
  GameObjectProps,
  HitBox,
  TargetProps,
} from '../../types';
import Target from '../Prefabs/Target.svelte';

export const SCALE = writable(1);
export const mouse = writable({ x: 0, y: 0 });
export const target = writable(new Vector(0, 0));
export const outline = writable([]);
let outlineValue: GameObject[];
outline.subscribe((v) => {
  return (outlineValue = v);
});

// #region outline
export function removeFromOutline(id) {
  console.log('REMOVING: ' + id + ' from outline');
  outline.set(outlineValue.filter((el) => el.props.id !== id));
}

export function addToOutline<T extends GameObjectProps>(
  Element: typeof SvelteComponentDev,
  props: T
) {
  outline.update((outline) => [...outline, { Element, props }]);
}

// #endregion outline

// #region hit boxes
export let hitBoxes = writable([]);
const hitBoxMap = new Map<string, HitBox>();
let registeredBoxes = [] as string[];

export function registerHitBox(hitBox: HitBox) {
  registeredBoxes.push(hitBox.id);
  // console.log(`${hitBox.id} is registered`);
  // console.log(registeredBoxes);

  hitBoxMap.set(hitBox.id, hitBox);
  hitBoxes.set([...hitBoxMap.values()]);
}

export function updateHitBox(hitBox: HitBox) {
  // sometimes renders can happen out of sync
  // if the hit box is not in the register then return
  if (!registeredBoxes.includes(hitBox.id)) return;
  // console.log(`${hitBox.id} is updated`);
  // console.log(registeredBoxes);
  hitBoxMap.set(hitBox.id, hitBox);
  hitBoxes.set([...hitBoxMap.values()]);
}

export function unregisterHitBox(id: string) {
  registeredBoxes = registeredBoxes.filter((boxId) => boxId != id);
  hitBoxMap.delete(id);
  hitBoxes.set([...hitBoxMap.values()]);
}

// #endregion hit boxes

// #region time
export const delta = writable(requestAnimationFrame(gameLoop));
let prevTime = performance.now();
let deltaTime = 0;
function gameLoop() {
  deltaTime = performance.now() - prevTime;
  prevTime = performance.now();

  requestAnimationFrame(gameLoop);
  delta.set(deltaTime);
}
// #endregion time
