import { sound } from "@pixi/sound";

export class SoundSystem {
  private muted = true;
  private currentTrack: string | null = null;

  playMusic(name: string, loop = true): void {
    if (this.muted) return;

    if (this.currentTrack === name) return;

    if (this.currentTrack) {
      sound.stop(this.currentTrack);
    }

    sound.play(name, { loop });
    this.currentTrack = name;
  }

  playSfx(name: string): void {
    if (this.muted) return;
    sound.play(name);
  }

  stopMusic(): void {
    if (this.currentTrack) {
      sound.stop(this.currentTrack);
      this.currentTrack = null;
    }
  }

  stopAll(): void {
    sound.stopAll();
    this.currentTrack = null;
  }

  toggleMute(): boolean {
    this.muted = !this.muted;

    if (this.muted) {
      this.stopAll();
    }

    return this.muted;
  }

  isMuted(): boolean {
    return this.muted;
  }
}
