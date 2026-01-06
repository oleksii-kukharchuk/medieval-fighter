import { Assets } from "pixi.js";

export async function loadAssets(): Promise<void> {
  await Assets.load([
    { alias: "enemy", src: "/assets/atlas/enemy.json" },
    { alias: "bg_level", src: "/assets/backgrounds/tavern.jpg" },
    { alias: "bg_menu", src: "/assets/backgrounds/menu.jpg" },
    { alias: "bg_victory", src: "/assets/backgrounds/victory.jpg" },
    { alias: "bg_defeat", src: "/assets/backgrounds/defeat.jpg" },

    // sounds
    { alias: "bg", src: "/assets/sounds/bg.mp3" },
    { alias: "enemyKill", src: "/assets/sounds/enemy_kill.mp3" },
    { alias: "victory", src: "/assets/sounds/victory.mp3" },
    { alias: "defeat", src: "/assets/sounds/defeat.mp3" },
  ]);
}
