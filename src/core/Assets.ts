import { Assets } from "pixi.js";

export async function loadAssets(): Promise<void> {
  await Assets.load({
    alias: "enemy",
    src: "/assets/atlas/enemy.json",
  });
}
