import * as PIXI from 'pixi.js';
import { Scene } from './Scene';
import { SceneManager } from '../core/SceneManager';
import { LevelScene } from './LevelScene';

interface VictoryData {
  levelId: number;
  timeSpent: number;
  maxTime: number;
}

export class VictoryScene extends Scene {
  constructor(
    private sceneManager: SceneManager,
    private data: VictoryData
  ) {
    super();
  }

  enter(): void {
    this.createBackground();
    this.createText();
    this.createButtons();
  }

  update(_dt: number): void {}

  exit(): void {}

  // ---------- UI ----------

  private createBackground(): void {
    const bg = new PIXI.Graphics();
    bg.beginFill(0x000000, 0.7);
    bg.drawRect(0, 0, 800, 600);
    bg.endFill();

    this.addChild(bg);
  }

  private createText(): void {
    const title = new PIXI.Text({
      text: 'VICTORY!',
      style: {
        fill: 0x00ff00,
        fontSize: 48,
        fontWeight: 'bold',
      },
    });

    title.anchor.set(0.5);
    title.position.set(400, 180);

    const stars = this.calculateStars();

    const rating = new PIXI.Text({
      text: `Stars: ${stars}`,
      style: {
        fill: 0xffffff,
        fontSize: 28,
      },
    });

    rating.anchor.set(0.5);
    rating.position.set(400, 260);

    this.addChild(title, rating);
  }

  private createButtons(): void {
    const nextBtn = this.createButton('NEXT LEVEL', 340);
    const replayBtn = this.createButton('REPLAY', 410);

    nextBtn.on('pointerdown', () => {
      this.sceneManager.change(
        new LevelScene(this.sceneManager, this.data.levelId + 1)
      );
    });

    replayBtn.on('pointerdown', () => {
      this.sceneManager.change(
        new LevelScene(this.sceneManager, this.data.levelId)
      );
    });

    this.addChild(nextBtn, replayBtn);
  }

  private createButton(text: string, y: number): PIXI.Text {
    const btn = new PIXI.Text({
      text,
      style: {
        fill: 0xffffff,
        fontSize: 24,
      },
    });

    btn.anchor.set(0.5);
    btn.position.set(400, y);
    btn.eventMode = 'static';
    btn.cursor = 'pointer';

    return btn;
  }

  // ---------- logic ----------

  private calculateStars(): number {
    const ratio = this.data.timeSpent / this.data.maxTime;

    if (ratio <= 0.33) return 3;
    if (ratio <= 0.66) return 2;
    return 1;
  }
}
