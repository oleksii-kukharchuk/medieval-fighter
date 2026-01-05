import * as PIXI from 'pixi.js';
import { Scene } from './Scene';
import { SceneManager } from '../core/SceneManager';
import { LevelScene } from './LevelScene';

export class MainMenuScene extends Scene {
  constructor(private sceneManager: SceneManager) {
    super();
  }

  enter(): void {
    const title = new PIXI.Text({
      text: 'Mini Game',
      style: {
        fill: 0xffffff,
        fontSize: 48,
      },
    });

    title.anchor.set(0.5);
    title.position.set(400, 200);

    const startButton = new PIXI.Text({
      text: 'START',
      style: {
        fill: 0x00ff00,
        fontSize: 32,
      },
    });

    startButton.anchor.set(0.5);
    startButton.position.set(400, 350);
    startButton.eventMode = 'static';
    startButton.cursor = 'pointer';

startButton.on('pointerdown', () => {
  this.sceneManager.change(
    new LevelScene(this.sceneManager, 1)
  );
});

    this.addChild(title, startButton);
  }

  update(_dt: number): void {}

  exit(): void {}
}
