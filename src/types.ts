import type { Vector } from 'vector2d';

export interface GameObjectProps {
  pos: Vector;
  id: string;
}

export interface GameObject {
  Element: any;
  props: GameObjectProps;
}

export interface TargetProps extends GameObjectProps {}
export interface MissileProps extends GameObjectProps {
  direction: Vector;
}

export interface HitBox {
  id: string;
  pos: Vector;
  size: Vector;
}
