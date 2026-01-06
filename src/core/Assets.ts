import { Assets } from "pixi.js";

export async function loadAssets(): Promise<void> {
  await Assets.load([
    { alias: "enemy", src: "/assets/atlas/enemy.json" },

    // sounds
    { alias: "bg", src: "/assets/sounds/bg.mp3" },
    { alias: "enemyKill", src: "/assets/sounds/enemy_kill.mp3" },
    { alias: "victory", src: "/assets/sounds/victory.mp3" },
    { alias: "defeat", src: "/assets/sounds/defeat.mp3" },
  ]);
}
