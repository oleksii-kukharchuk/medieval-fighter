import { Game } from "./core/Game";

async function bootstrap() {
  const game = new Game();
  await game.start();

  const root = document.getElementById("game-root");
  root?.appendChild(game.app.canvas);
}

bootstrap();
