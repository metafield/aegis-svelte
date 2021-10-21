import type { SvelteComponentDev } from 'svelte/internal';
import { writable } from 'svelte/store';
import { Vector } from 'vector2d';
import type { GameObject, HitBox } from '../../types';
import Target from '../Prefabs/Target.svelte';

export const SCALE = writable(1);
export const mouse = writable({ x: 0, y: 0 });
export const target = writable(new Vector(0, 0));

export const outline = writable([] as GameObject[]);
export const hitBoxes = writable([
  { id: 'aad', pos: new Vector(300, 300), size: new Vector(20, 20) },
]);

let outlineValue: GameObject[];
outline.subscribe((v) => (outlineValue = v));

export function removeFromOutline(id) {
  outline.set(outlineValue.filter((el) => el.props.id !== id));
  unregisterHitBox(id);
}

export function addToOutline() {
  const newElement = {
    Element: Target,
    props: { pos: new Vector(400, 100), id: Math.random().toString() },
  };
  outline.update((outline) => [...outline, newElement]);
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

addToOutline();
