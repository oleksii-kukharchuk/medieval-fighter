import * as PIXI from 'pixi.js';

export class Enemy extends PIXI.Graphics {
  public alive = true;

  constructor(x: number, y: number) {
    super();

    this.beginFill(0xff0000);
    this.drawCircle(0, 0, 25);
    this.endFill();

    this.position.set(x, y);

    this.eventMode = 'static';
    this.cursor = 'pointer';
  }

  kill(): void {
    this.alive = false;
    this.destroy();
  }
}
