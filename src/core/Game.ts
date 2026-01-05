import * as PIXI from 'pixi.js';
import { SceneManager } from './SceneManager';
import { MainMenuScene } from '../scenes/MainMenuScene';

export class Game {
  public readonly app: PIXI.Application;
  public sceneManager!: SceneManager;

  constructor() {
    this.app = new PIXI.Application();
  }

  async start(): Promise<void> {
    await this.app.init({
      width: 800,
      height: 600,
      backgroundColor: 0x1e1e1e,
    });

    document.body.appendChild(this.app.canvas);

    this.sceneManager = new SceneManager(this.app);

    this.app.ticker.add(this.update);

    this.sceneManager.change(new MainMenuScene(this.sceneManager));
  }

  private update = (ticker: PIXI.Ticker): void => {
    const dt = ticker.deltaTime / 60;
    this.sceneManager.update(dt);
  };
}
