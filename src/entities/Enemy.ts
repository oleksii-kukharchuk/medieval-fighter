import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";

export class Enemy extends PIXI.AnimatedSprite {
  private speed = 20;

  constructor() {
    const sheet = Assets.get("enemy") as PIXI.Spritesheet;
    const textures = [
      sheet.textures["idle_1.png"],
      sheet.textures["idle_2.png"],
      sheet.textures["idle_3.png"],
      sheet.textures["idle_4.png"],
    ];

    super(textures);

    this.anchor.set(0.5);

    this.animationSpeed = 0.15;
    this.play();

    this.eventMode = "static";
    this.cursor = "pointer";
  }

  updateEnemy(dt: number): void {
    this.x += Math.sin(performance.now() / 500) * this.speed * dt;
  }

  kill(): void {
    this.stop();
    this.destroy();
  }

  pause(): void {
    this.stop();
  }

  resume(): void {
    this.play();
  }
}
