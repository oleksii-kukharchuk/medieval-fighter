import * as PIXI from 'pixi.js';

export abstract class Scene extends PIXI.Container {
  abstract enter(): void;
  abstract update(dt: number): void;
  abstract exit(): void;
}
