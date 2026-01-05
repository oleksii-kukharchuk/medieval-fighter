import * as PIXI from "pixi.js";

interface HUDCallbacks {
  onPauseToggle: (paused: boolean) => void;
  onBoosterUse: () => void;
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

    this.timeText = new PIXI.Text({
      text: "Time: 0",
      style: { fill: 0xffffff, fontSize: 20 },
    });

    this.enemiesText = new PIXI.Text({
      text: `Enemies: 0 / ${totalEnemies}`,
      style: { fill: 0xffffff, fontSize: 20 },
    });

    this.pauseButton = new PIXI.Text({
      text: "PAUSE",
      style: { fill: 0xffcc00, fontSize: 20 },
    });

    this.boosterButton = new PIXI.Text({
      text: "+10s",
      style: { fill: 0x00ffcc, fontSize: 20 },
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

    this.pauseButton.position.set(700, 20);
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
