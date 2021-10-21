import { writable } from 'svelte/store';
import { Vector } from 'vector2d';

export const SCALE = writable(1);
export const mouse = writable({ x: 0, y: 0 });
export const target = writable(new Vector(0, 0));
