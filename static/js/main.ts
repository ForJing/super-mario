import SpriteSheet from "./SpriteSheet";
import { loadImage, loadLevel } from "./loaders";

function drawBackground(
  background,
  context: CanvasRenderingContext2D,
  sprites
) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

const canvas = document.getElementById("screen") as HTMLCanvasElement;
const context = canvas.getContext("2d");

loadImage(require("../img/tiles.png")).then(image => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define("ground", 0, 0);
  sprites.define("sky", 3, 23);

  loadLevel("1-1").then(level => {
    level.backgrounds.forEach(background => {
      drawBackground(background, context, sprites);
    });
  });
});
