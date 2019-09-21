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
    // comp.layers.push(backgroundLayer);

    const gravity = 30;

    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    let deltaTime = 0;
    let lastTime = 0;

    function update(time) {
      deltaTime = (time - lastTime) / 1000;
      console.log(deltaTime);

      comp.draw(context);
      mario.update(deltaTime);
      console.log(mario.pos);
      mario.vel.y += gravity;
      // setTimeout(update, 1000 / 1);
      requestAnimationFrame(update);


      lastTime = time; 
    }

    update(0);
  }
);
