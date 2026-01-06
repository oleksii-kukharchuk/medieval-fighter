import * as PIXI from "pixi.js";
import { Scene } from "./Scene";
import { SceneManager } from "../core/SceneManager";
import levelsData from "../data/levels.json";
import { LevelConfig } from "../systems/LevelTypes";
import { Enemy } from "../entities/Enemy";
import { DefeatScene } from "./DefeatScene";
import { VictoryScene } from "./VictoryScene";
import { HUD } from "../ui/HUD";
import { SoundSystem } from "../systems/SoundSystem";

export class LevelScene extends Scene {
  private level!: LevelConfig;
  private enemies: Enemy[] = [];
  private timeLeft!: number;
  private hud!: HUD;
  private paused = false;
  private killedEnemies = 0;
  private boosterUsed = false;

  constructor(
    private sceneManager: SceneManager,
    private soundSystem: SoundSystem,
    levelId: number
  ) {
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
    //this.soundSystem.stopAll();
    this.soundSystem.playMusic("bg", true);

    this.createBackground();
    this.createEnemies();

    this.hud = new HUD(this.level.enemies.length, {
      onPauseToggle: (paused) => {
        this.paused = paused;
      },
      onBoosterUse: () => {
        this.useBooster();
      },
      onMuteToggle: () => {
        const muted = this.soundSystem.toggleMute();

        if (!muted) {
          this.soundSystem.playMusic("bg", true);
        }

        return muted;
      },
    });

    this.addChild(this.hud);
  }

  update(dt: number): void {
    if (this.paused) return;

    this.timeLeft -= dt;
    this.hud.updateTime(this.timeLeft);

    this.enemies.forEach((enemy) => enemy.updateEnemy(dt));

    if (this.timeLeft <= 0) {
      this.lose();
      return;
    }

    if (this.enemies.length === 0) {
      this.win();
    }
  }

  exit(): void {}

  onUnmute = () => {
    this.soundSystem.playMusic("bg", true);
  };

  // ---------- helpers ----------

  private createBackground(): void {
    const bg = new PIXI.Graphics();
    bg.beginFill(0x2c3e50);
    bg.drawRect(0, 0, 800, 600);
    bg.endFill();

    this.addChild(bg);
  }

  private useBooster(): void {
    if (this.boosterUsed) return;

    this.boosterUsed = true;
    this.timeLeft += 10;
    this.hud.updateTime(this.timeLeft);
  }

  private createEnemies(): void {
    this.level.enemies.forEach((config) => {
      const enemy = new Enemy(config.x, config.y);

      enemy.on("pointerdown", () => {
        this.soundSystem.playSfx("enemyKill");
        enemy.kill();
        this.enemies = this.enemies.filter((e) => e !== enemy);

        this.killedEnemies++;
        this.hud.updateEnemies(this.killedEnemies, this.level.enemies.length);
      });

      this.enemies.push(enemy);
      this.addChild(enemy);
    });
  }

  private win(): void {
    this.soundSystem.playMusic("victory");

    this.sceneManager.change(
      new VictoryScene(this.sceneManager, this.soundSystem, {
        levelId: this.level.id,
        timeSpent: this.level.time - this.timeLeft,
        maxTime: this.level.time,
      })
    );
  }

  private lose(): void {
    this.soundSystem.playMusic("defeat");
    this.sceneManager.change(
      new DefeatScene(this.sceneManager, this.soundSystem, this.level.id)
    );
  }
}
