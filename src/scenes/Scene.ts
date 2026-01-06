import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";

export abstract class Scene extends PIXI.Container {
  protected addBackground(alias: string): void {
    const texture = Assets.get(alias);
    const bg = new PIXI.Sprite(texture);

    bg.anchor.set(0.5);
    bg.position.set(400, 300);
    bg.scale.set(1.2);

    this.addChildAt(bg, 0);
  }

  abstract enter(): void;
  abstract update(dt: number): void;
  abstract exit(): void;

  onUnmute?(): void;
}
