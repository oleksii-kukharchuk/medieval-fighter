import { Game } from "./core/Game";

async function loadFonts(): Promise<void> {
  await document.fonts.load("16px MedievalSharp");
}

async function bootstrap() {
  await loadFonts();

  const game = new Game();
  await game.start();

  const root = document.getElementById("game-root");
  if (!root) return;

  root?.appendChild(game.app.canvas);

  game.app.ticker.addOnce(() => {
    root.style.visibility = "visible";
  });
}

bootstrap();
