import * as PIXI from "pixi.js";
import { Scene } from "./Scene";
import { SceneManager } from "../core/SceneManager";
import { LevelScene } from "./LevelScene";
import { SoundSystem } from "../systems/SoundSystem";
import { DefaultTextStyle, TitleTextStyle } from "../ui/TextStyles";

export class MainMenuScene extends Scene {
  constructor(
    private sceneManager: SceneManager,
    private soundSystem: SoundSystem
  ) {
    super();
  }

  enter(): void {
    this.addBackground("bg_menu");

    const title = new PIXI.Text({
      text: "Medieval Fighter",
      style: TitleTextStyle,
    });

    title.anchor.set(0.5);
    title.position.set(400, 200);

    const startButton = new PIXI.Text({
      text: "START",
      style: DefaultTextStyle,
    });

    startButton.anchor.set(0.5);
    startButton.position.set(400, 350);
    startButton.eventMode = "static";
    startButton.cursor = "pointer";

    startButton.on("pointerdown", () => {
      console.log("START CLICKED");
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
