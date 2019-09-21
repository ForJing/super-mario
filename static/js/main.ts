import SpriteSheet from "./SpriteSheet";
import { loadLevel } from "./loaders";
import Compositor from "./Compositor";
import { createBackgroundLayer, createSpriteLayer } from "./layers";
import { loadMarioSprite, loadBackGroundSpirtes } from "./sprites";

const canvas = document.getElementById("screen") as HTMLCanvasElement;
const context = canvas.getContext("2d");

class Vec2 {
  constructor(public x, public y) {}
}

class Entity {
  pos: Vec2;
  vel: Vec2;

  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
  }
}

Promise.all([
  loadMarioSprite(),
  loadBackGroundSpirtes(),
  loadLevel("1-1")
]).then(([marioSprite, sprites, level]) => {
  const comp = new Compositor();

  const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);
  comp.layers.push(backgroundLayer);

  const pos = new Vec2(64, 180);
  const vel = new Vec2(2, -10);

  const gravity = 0.5;

  const spriteLayer = createSpriteLayer(marioSprite, pos);
  comp.layers.push(spriteLayer);

  function update() {
    comp.draw(context);
    pos.x += vel.x;
    pos.y += vel.y;
    vel.y += gravity;
    requestAnimationFrame(update);
  }

  update();
});
