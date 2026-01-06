import * as PIXI from "pixi.js";
import { Scene } from "./Scene";
import { SceneManager } from "../core/SceneManager";
import { LevelScene } from "./LevelScene";
import { SoundSystem } from "../systems/SoundSystem";
import { DefaultTextStyle, TitleTextStyle } from "../ui/TextStyles";

interface VictoryData {
  levelId: number;
  timeSpent: number;
  maxTime: number;
  stars: number;
}

export class VictoryScene extends Scene {
  constructor(
    private sceneManager: SceneManager,
    private soundSystem: SoundSystem,
    private data: VictoryData
  ) {
    super();
  }

  enter(): void {
    this.soundSystem.stopMusic();
    this.soundSystem.playMusic("victory");

    this.addBackground("bg_victory");
    this.createText();
    this.createButtons();
    this.createStars();
  }

  update(_dt: number): void {}

  exit(): void {
    this.soundSystem.stopMusic();
  }

  onUnmute = () => {
    this.soundSystem.playMusic("victory");
  };

  // ---------- UI ----------

  private createText(): void {
    const title = new PIXI.Text({
      text: "VICTORY",
      style: TitleTextStyle,
    });

    title.anchor.set(0.5);
    title.position.set(400, 180);

    const stars = this.calculateStars();

    this.addChild(title);
  }

  private createButtons(): void {
    const nextBtn = this.createButton("NEXT LEVEL", 340);
    const replayBtn = this.createButton("REPLAY", 410);

    nextBtn.on("pointerdown", () => {
      this.sceneManager.change(
        new LevelScene(
          this.sceneManager,
          this.soundSystem,
          this.data.levelId + 1
        )
      );
    });

    replayBtn.on("pointerdown", () => {
      this.sceneManager.change(
        new LevelScene(this.sceneManager, this.soundSystem, this.data.levelId)
      );
    });

    this.addChild(nextBtn, replayBtn);
  }

  private createButton(text: string, y: number): PIXI.Text {
    const btn = new PIXI.Text({
      text,
      style: DefaultTextStyle,
    });

    btn.anchor.set(0.5);
    btn.position.set(400, y);
    btn.eventMode = "static";
    btn.cursor = "pointer";

    return btn;
  }

  private createStars(): void {
    const starsText = "⭐".repeat(this.data.stars);

    const text = new PIXI.Text({
      text: starsText,
      style: DefaultTextStyle,
    });

    text.anchor.set(0.5);
    text.position.set(400, 260);

    this.addChild(text);
  }

  // ---------- logic ----------

  private calculateStars(): number {
    const ratio = this.data.timeSpent / this.data.maxTime;

    if (ratio <= 0.33) return 3;
    if (ratio <= 0.66) return 2;
    return 1;
  }
}
