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
  private killedEnemies = 0;
  private boosterUsed = false;
  private paused = false;

  private hud!: HUD;

  // 🔑 LAYERS
  private gameLayer = new PIXI.Container();
  private uiLayer = new PIXI.Container();

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

  // ------------------------------------------------
  // SCENE LIFECYCLE
  // ------------------------------------------------

  public enter(): void {
    this.soundSystem.playMusic("bg", true);

    // add layers
    this.addChild(this.gameLayer);
    this.addChild(this.uiLayer);

    // background
    this.addBackground("bg_level");

    // enemies
    this.createEnemies();

    // HUD (NO MUTE HERE)
    this.hud = new HUD(this.level.enemies.length, {
      onPauseToggle: (paused) => this.togglePause(paused),
      onBoosterUse: () => this.useBooster(),
    });

    this.uiLayer.addChild(this.hud);
  }

  public update(dt: number): void {
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

  public exit(): void {
    this.gameLayer.removeChildren();
    this.uiLayer.removeChildren();
  }

  // ------------------------------------------------
  // GLOBAL UI HOOK
  // ------------------------------------------------

  onUnmute = () => {
    this.soundSystem.playMusic("bg", true);
  };

  // ------------------------------------------------
  // PAUSE / BLUR
  // ------------------------------------------------

  private togglePause(paused: boolean): void {
    this.paused = paused;

    // pause / resume enemies
    this.enemies.forEach((enemy) => (paused ? enemy.pause() : enemy.resume()));

    // blur only game layer (keep UI layer clear)
    if (paused) {
      this.gameLayer.filters = [new PIXI.BlurFilter(6)];
    } else {
      this.gameLayer.filters = [];
    }
  }

  // ------------------------------------------------
  // GAMEPLAY HELPERS
  // ------------------------------------------------

  private useBooster(): void {
    if (this.boosterUsed) return;

    this.boosterUsed = true;
    this.timeLeft += 10;
    this.hud.updateTime(this.timeLeft);
  }

  private createEnemies(): void {
    this.level.enemies.forEach((config) => {
      const enemy = new Enemy();

      enemy.position.set(config.x, config.y);
      enemy.scale.set(config.scale ?? 1);
      enemy.hitArea = new PIXI.Circle(0, 0, 32);

      const killEnemy = () => {
        // Forbid killing enemies when paused (blur is active)
        if (this.paused) return;

        this.soundSystem.playSfx("enemyKill");

        enemy.off("pointerdown", killEnemy);
        enemy.kill();
        this.enemies = this.enemies.filter((e) => e !== enemy);

        this.killedEnemies++;
        this.hud.updateEnemies(this.killedEnemies, this.level.enemies.length);
      };

      enemy.on("pointerdown", killEnemy);

      this.enemies.push(enemy);
      this.gameLayer.addChild(enemy);
    });
  }

  // ------------------------------------------------
  // WIN / LOSE
  // ------------------------------------------------

  private win(): void {
    const timeSpent = this.level.time - this.timeLeft;
    const stars = this.calculateStars(timeSpent, this.level.time);

    this.sceneManager.change(
      new VictoryScene(this.sceneManager, this.soundSystem, {
        levelId: this.level.id,
        timeSpent,
        maxTime: this.level.time,
        stars,
      })
    );
  }

  private lose(): void {
    this.soundSystem.playMusic("defeat");

    this.sceneManager.change(
      new DefeatScene(this.sceneManager, this.soundSystem, this.level.id)
    );
  }

  private calculateStars(timeSpent: number, maxTime: number): number {
    const third = maxTime / 3;

    if (timeSpent <= third) return 3;
    if (timeSpent <= third * 2) return 2;
    return 1;
  }
}
