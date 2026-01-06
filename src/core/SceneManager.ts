import * as PIXI from "pixi.js";
import { Scene } from "../scenes/Scene";

export class SceneManager {
  private currentScene?: Scene;

  constructor(private app: PIXI.Application) {}

  change(scene: Scene): void {
    if (this.currentScene) {
      this.currentScene.exit();
      this.app.stage.removeChild(this.currentScene);
      this.currentScene.destroy({ children: true });
    }

    this.currentScene = scene;
    this.app.stage.addChild(this.currentScene);
    this.currentScene.enter();
  }

  update(dt: number): void {
    this.currentScene?.update(dt);
  }

  getCurrentScene(): Scene | undefined {
    return this.currentScene;
  }
}
