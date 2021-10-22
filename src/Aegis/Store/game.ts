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
export const hitBoxes = writable([]);

let outlineValue: GameObject[];
outline.subscribe((v) => (outlineValue = v));

export function removeFromOutline(id) {
  outline.set(outlineValue.filter((el) => el.props.id !== id));
  unregisterHitBox(id);
}

export function addToOutline<T extends GameObjectProps>(
  Element: typeof SvelteComponentDev,
  props: T
) {
  outline.update((outline) => [...outline, { Element, props }]);
}

export function registerHitBox(hitBox: HitBox) {
  hitBoxes.update((hitBoxes) => {
    // if we have this one then throw it away
    const uniqueBoxes = hitBoxes.filter((el) => el.id != hitBox.id);

    return [...uniqueBoxes, hitBox];
  });
}

function unregisterHitBox(id: string) {
  hitBoxes.update((hitBoxes) => hitBoxes.filter((el) => el.id !== id));
}

addToOutline<TargetProps>(Target, {
  id: 'blah de blah',
  pos: new Vector(334, 123),
});
