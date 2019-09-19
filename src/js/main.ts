import SpriteSheet from "./SpriteSheet";
import { loadImage } from "./loaders";

const canvas = document.getElementById("screen") as HTMLCanvasElement;
const context = canvas.getContext("2d");

loadImage(require("../img/tiles.png")).then(image => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define("ground", 0, 0);
  sprites.define("sky", 3, 23);

  for (let x = 0; x < 25; x++) {
    for (let y = 0; y < 14; y++) {
      sprites.drawTile("sky", context, x, y);
    }
  }

  for (let x = 0; x < 25; x++) {
    for (let y = 12; y < 14; y++) {
      sprites.drawTile("ground", context, x, y);
    }
  }
});
