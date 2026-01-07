import * as PIXI from "pixi.js";
import { DefaultTextStyle } from "./TextStyles";

interface HUDCallbacks {
  onPauseToggle: (paused: boolean) => void;
  onBoosterUse: () => void;
  // onMuteToggle: () => boolean;
}

export class HUD extends PIXI.Container {
  private timeText: PIXI.Text;
  private enemiesText: PIXI.Text;
  private pauseButton: PIXI.Text;
  private boosterButton: PIXI.Text;
  private boosterUsed = false;
  private paused = false;

  constructor(totalEnemies: number, private callbacks: HUDCallbacks) {
    super();

    const muteButton = new PIXI.Text({
      text: "🔊",
      style: { fontSize: 20 },
    });

    muteButton.position.set(700, 100);
    muteButton.eventMode = "static";
    muteButton.cursor = "pointer";

    this.timeText = new PIXI.Text({
      text: "Time: 0",
      style: DefaultTextStyle,
    });

    this.enemiesText = new PIXI.Text({
      text: `Enemies: 0 / ${totalEnemies}`,
      style: DefaultTextStyle,
    });

    this.pauseButton = new PIXI.Text({
      text: "PAUSE",
      style: DefaultTextStyle,
    });

    this.boosterButton = new PIXI.Text({
      text: "+10s",
      style: DefaultTextStyle,
    });

    this.boosterButton.position.set(700, 60);
    this.boosterButton.eventMode = "static";
    this.boosterButton.cursor = "pointer";

    this.boosterButton.on("pointerdown", () => {
      if (this.boosterUsed) return;

      this.boosterUsed = true;
      this.boosterButton.alpha = 0.5;
      this.callbacks.onBoosterUse();
    });

    this.addChild(this.boosterButton);

    this.setupLayout();
    this.setupPauseButton();
  }

  private setupLayout(): void {
    this.timeText.position.set(20, 20);
    this.enemiesText.position.set(20, 50);

    this.pauseButton.position.set(675, 20);
    this.pauseButton.eventMode = "static";
    this.pauseButton.cursor = "pointer";

    this.addChild(this.timeText, this.enemiesText, this.pauseButton);
  }

  private setupPauseButton(): void {
    this.pauseButton.on("pointerdown", () => {
      this.paused = !this.paused;
      this.pauseButton.text = this.paused ? "RESUME" : "PAUSE";
      this.callbacks.onPauseToggle(this.paused);
    });
  }

  // ---------- public API ----------

  updateTime(seconds: number): void {
    this.timeText.text = `Time: ${Math.ceil(seconds)}`;
  }

  updateEnemies(killed: number, total: number): void {
    this.enemiesText.text = `Enemies: ${killed} / ${total}`;
  }
}
