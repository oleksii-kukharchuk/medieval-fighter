// import * as PIXI from 'pixi.js';

// const app = new PIXI.Application();

// async function bootstrap() {
//   await app.init({
//     width: 800,
//     height: 600,
//     backgroundColor: 0x1e1e1e,
//   });

//   document.body.appendChild(app.canvas);
// }

// bootstrap();

import { Game } from './core/Game';

const game = new Game();
game.start();
