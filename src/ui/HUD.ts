import * as PIXI from 'pixi.js';

interface HUDCallbacks {
  onPauseToggle: (paused: boolean) => void;
}

export class HUD extends PIXI.Container {
  private timeText: PIXI.Text;
  private enemiesText: PIXI.Text;
  private pauseButton: PIXI.Text;

  private paused = false;

  constructor(
    totalEnemies: number,
    private callbacks: HUDCallbacks
  ) {
    super();

    this.timeText = new PIXI.Text({
      text: 'Time: 0',
      style: { fill: 0xffffff, fontSize: 20 },
    });

    this.enemiesText = new PIXI.Text({
      text: `Enemies: 0 / ${totalEnemies}`,
      style: { fill: 0xffffff, fontSize: 20 },
    });

    this.pauseButton = new PIXI.Text({
      text: 'PAUSE',
      style: { fill: 0xffcc00, fontSize: 20 },
    });

    this.setupLayout();
    this.setupPauseButton();
  }

  private setupLayout(): void {
    this.timeText.position.set(20, 20);
    this.enemiesText.position.set(20, 50);

    this.pauseButton.position.set(700, 20);
    this.pauseButton.eventMode = 'static';
    this.pauseButton.cursor = 'pointer';

    this.addChild(
      this.timeText,
      this.enemiesText,
      this.pauseButton
    );
  }

  private setupPauseButton(): void {
    this.pauseButton.on('pointerdown', () => {
      this.paused = !this.paused;
      this.pauseButton.text = this.paused ? 'RESUME' : 'PAUSE';
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
