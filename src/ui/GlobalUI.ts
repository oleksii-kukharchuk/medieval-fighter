import * as PIXI from "pixi.js";
import { SoundSystem } from "../systems/SoundSystem";
import { MuteButtonTextStyle } from "./TextStyles";

export class GlobalUI extends PIXI.Container {
  private muteButton: PIXI.Text;

  constructor(private soundSystem: SoundSystem, private onUnmute: () => void) {
    super();

    this.muteButton = new PIXI.Text({
      text: this.soundSystem.isMuted() ? "🔊" : "🔇",
      style: MuteButtonTextStyle,
    });

    this.muteButton.position.set(380, 20);
    this.muteButton.eventMode = "static";
    this.muteButton.cursor = "pointer";

    this.muteButton.on("pointerdown", () => {
      const muted = this.soundSystem.toggleMute();
      this.muteButton.text = muted ? "🔇" : "🔊";

      if (!muted) {
        this.onUnmute();
      }
    });

    this.addChild(this.muteButton);
  }
}
