import SpriteSheet from "./SpriteSheet";
import { loadImage, loadLevel } from "./loaders";
import Compositor from "./Compositor";
import { createBackgroundLayer, createSpriteLayer } from "./layers";

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
  const comp = new Compositor();

  const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);
  comp.layers.push(backgroundLayer);

  const pos = {
    x: 64,
    y: 64
  };

  const spriteLayer = createSpriteLayer(marioSprite, pos);
  comp.layers.push(spriteLayer);

  function update() {
    comp.draw(context);
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }

  update();
});
