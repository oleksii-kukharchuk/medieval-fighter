import * as PIXI from "pixi.js";
import { SceneManager } from "./SceneManager";
import { MainMenuScene } from "../scenes/MainMenuScene";
import { loadAssets } from "./Assets";
import { SoundSystem } from "../systems/SoundSystem";
import { GlobalUI } from "../ui/GlobalUI";

export class Game {
  public readonly app: PIXI.Application;
  public readonly soundSystem = new SoundSystem();
  public sceneManager!: SceneManager;
  private globalUI!: GlobalUI;

  constructor() {
    this.app = new PIXI.Application();
  }
  async start(): Promise<void> {
    await this.app.init({
      width: 800,
      height: 600,
    });

    this.app.renderer.background.alpha = 0;

    await loadAssets();

    document.body.appendChild(this.app.canvas);

    this.sceneManager = new SceneManager(this.app);

    this.app.ticker.add(this.update);

    this.globalUI = new GlobalUI(this.soundSystem, () => {
      this.sceneManager.getCurrentScene()?.onUnmute?.();
    });

    this.app.stage.addChild(this.globalUI);

    this.sceneManager.change(
      new MainMenuScene(this.sceneManager, this.soundSystem)
    );
  }

  private update = (ticker: PIXI.Ticker): void => {
    const dt = ticker.deltaTime / 60;
    this.sceneManager.update(dt);
  };
}
