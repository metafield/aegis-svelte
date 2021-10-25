import type { AbstractVector, Vector } from 'vector2d';

export interface GameObjectProps {
  pos: AbstractVector;
  id: string;
}

export interface GameObject {
  Element: any;
  props: GameObjectProps;
}

export interface TargetProps extends GameObjectProps {}
export interface MissileProps extends GameObjectProps {
  direction: AbstractVector;
  target: AbstractVector;
}

export interface HitBox {
  id: string;
  pos: Vector;
  size: Vector;
}
