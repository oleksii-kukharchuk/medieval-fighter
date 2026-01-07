import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";

export abstract class Scene extends PIXI.Container {
  protected blurFilter = new PIXI.BlurFilter(0);

  constructor() {
    super();
    this.filters = [this.blurFilter];
  }

  protected setBlur(enabled: boolean): void {
    this.blurFilter.blur = enabled ? 6 : 0;
  }

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
