import * as PIXI from "pixi.js";
import { Scene } from "./Scene";
import { SceneManager } from "../core/SceneManager";
import { LevelScene } from "./LevelScene";
import { SoundSystem } from "../systems/SoundSystem";

export class MainMenuScene extends Scene {
  constructor(
    private sceneManager: SceneManager,
    private soundSystem: SoundSystem
  ) {
    super();
  }

  enter(): void {
    const title = new PIXI.Text({
      text: "Mini Game",
      style: {
        fill: 0xffffff,
        fontSize: 48,
      },
    });

    title.anchor.set(0.5);
    title.position.set(400, 200);

    const startButton = new PIXI.Text({
      text: "START",
      style: {
        fill: 0x00ff00,
        fontSize: 32,
      },
    });

    startButton.anchor.set(0.5);
    startButton.position.set(400, 350);
    startButton.eventMode = "static";
    startButton.cursor = "pointer";

    startButton.on("pointerdown", () => {
      console.log("START CLICKED");

      // this.soundSystem.play("bg", true);

      console.log("GO TO LEVEL");

      this.sceneManager.change(
        new LevelScene(this.sceneManager, this.soundSystem, 1)
      );
    });

    this.addChild(title, startButton);
  }

  update(_dt: number): void {}

  exit(): void {}

  onUnmute = () => {
    this.soundSystem.playMusic("bg", true);
  };
}
