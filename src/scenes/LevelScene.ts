import * as PIXI from "pixi.js";
import { Scene } from "./Scene";
import { SceneManager } from "../core/SceneManager";
import levelsData from "../data/levels.json";
import { LevelConfig } from "../systems/LevelTypes";
import { Enemy } from "../entities/Enemy";
import { DefeatScene } from "./DefeatScene";
import { VictoryScene } from "./VictoryScene";
import { HUD } from "../ui/HUD";

export class LevelScene extends Scene {
  private level!: LevelConfig;
  private enemies: Enemy[] = [];
  private timeLeft!: number;
  //private timerText!: PIXI.Text;
  private hud!: HUD;
  private paused = false;
  private killedEnemies = 0;

  constructor(private sceneManager: SceneManager, levelId: number) {
    super();

    const level = (levelsData.levels as LevelConfig[]).find(
      (l) => l.id === levelId
    );

    if (!level) {
      throw new Error(`Level ${levelId} not found`);
    }

    this.level = level;
    this.timeLeft = level.time;
  }

  enter(): void {
    this.createBackground();
    this.createEnemies();
    //this.createTimer();

    this.hud = new HUD(this.level.enemies.length, {
      onPauseToggle: (paused) => {
        this.paused = paused;
      },
    });

    this.addChild(this.hud);
  }

  update(dt: number): void {
    if (this.paused) return;

    this.timeLeft -= dt;
    this.hud.updateTime(this.timeLeft);

    if (this.timeLeft <= 0) {
      this.lose();
      return;
    }

    if (this.enemies.length === 0) {
      this.win();
    }
  }

  exit(): void {}

  // ---------- helpers ----------

  private createBackground(): void {
    const bg = new PIXI.Graphics();
    bg.beginFill(0x2c3e50);
    bg.drawRect(0, 0, 800, 600);
    bg.endFill();

    this.addChild(bg);
  }

  private createEnemies(): void {
    this.level.enemies.forEach((config) => {
      const enemy = new Enemy(config.x, config.y);

      enemy.on("pointerdown", () => {
        enemy.kill();
        this.enemies = this.enemies.filter((e) => e !== enemy);

        this.killedEnemies++;
        this.hud.updateEnemies(this.killedEnemies, this.level.enemies.length);
      });

      this.enemies.push(enemy);
      this.addChild(enemy);
    });
  }

  // private createTimer(): void {
  //   this.timerText = new PIXI.Text({
  //     text: `Time: ${this.timeLeft}`,
  //     style: {
  //       fill: 0xffffff,
  //       fontSize: 24,
  //     },
  //   });

  //   this.timerText.position.set(20, 20);
  //   this.addChild(this.timerText);
  // }

  private win(): void {
    this.sceneManager.change(
      new VictoryScene(this.sceneManager, {
        levelId: this.level.id,
        timeSpent: this.level.time - this.timeLeft,
        maxTime: this.level.time,
      })
    );
  }

  private lose(): void {
    this.sceneManager.change(new DefeatScene(this.sceneManager, this.level.id));
  }
}
