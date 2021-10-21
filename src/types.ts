import type { SvelteComponent, SvelteComponentDev } from 'svelte/internal';
import type { Vector } from 'vector2d';

export interface GameObject {
  Element: any;
  props: { pos: Vector; id: string };
}

export interface HitBox {
  id: string;
  pos: Vector;
  size: Vector;
}
