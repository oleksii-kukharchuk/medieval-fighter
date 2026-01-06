import * as PIXI from "pixi.js";
import { Scene } from "./Scene";
import { SceneManager } from "../core/SceneManager";
import { LevelScene } from "./LevelScene";
import { SoundSystem } from "../systems/SoundSystem";

export class DefeatScene extends Scene {
  constructor(
    private sceneManager: SceneManager,
    private soundSystem: SoundSystem,
    private levelId: number
  ) {
    super();
  }

  enter(): void {
    this.soundSystem.stopMusic();
    this.soundSystem.playMusic("defeat");

    this.addBackground("bg_defeat");
    this.createText();
    this.createButton();
  }

  update(_dt: number): void {}

  exit(): void {
    this.soundSystem.stopMusic();
  }

  onUnmute = () => {
    this.soundSystem.playMusic("defeat");
  };

  private createText(): void {
    const title = new PIXI.Text({
      text: "DEFEAT",
      style: {
        fill: 0xff0000,
        fontSize: 48,
        fontWeight: "bold",
      },
    });

    title.anchor.set(0.5);
    title.position.set(400, 220);

    this.addChild(title);
  }

  private createButton(): void {
    const retry = new PIXI.Text({
      text: "RETRY",
      style: {
        fill: 0xffffff,
        fontSize: 24,
      },
    });

    retry.anchor.set(0.5);
    retry.position.set(400, 340);
    retry.eventMode = "static";
    retry.cursor = "pointer";

    retry.on("pointerdown", () => {
      this.sceneManager.change(
        new LevelScene(this.sceneManager, this.soundSystem, this.levelId)
      );
    });

    this.addChild(retry);
  }
}
