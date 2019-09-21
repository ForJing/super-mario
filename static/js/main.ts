import { loadLevel } from "./loaders";
import Compositor from "./Compositor";
import { createBackgroundLayer, createSpriteLayer } from "./layers";
import { loadBackGroundSpirtes } from "./sprites";
import { createMario } from "./entities";

const canvas = document.getElementById("screen") as HTMLCanvasElement;
const context = canvas.getContext("2d");

Promise.all([createMario(), loadBackGroundSpirtes(), loadLevel("1-1")]).then(
  ([mario, sprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);
    comp.layers.push(backgroundLayer);

    const gravity = 0.5;

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    function update() {
      comp.draw(context);
      mario.update();
      mario.vel.y += gravity;
      requestAnimationFrame(update);
    }

    update();
  }
);
