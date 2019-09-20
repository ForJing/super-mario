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

function loadMarioSprite() {
  return loadImage("/img/characters.gif").then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define("idle", 276, 44, 16, 16);
    return sprites;
  });
}

function loadBackGroundSpirtes() {
  return loadImage("/img/tiles.png").then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.defineTile("ground", 0, 0);
    sprites.defineTile("sky", 3, 23);
    return sprites;
  });
}

Promise.all([
  loadMarioSprite(),
  loadBackGroundSpirtes(),
  loadLevel("1-1")
]).then(([marioSprite, sprites, level]) => {
  level.backgrounds.forEach(background => {
    drawBackground(background, context, sprites);
  });

  const pos = {
    x: 64,
    y: 64
  };

  function update() {
    marioSprite.draw("idle", context, pos.x, pos.y);
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }

  update();
});
