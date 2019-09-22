import { loadLevel } from "./loaders";
import Compositor from "./Compositor";
import { createBackgroundLayer, createSpriteLayer } from "./layers";
import { loadBackGroundSpirtes } from "./sprites";
import { createMario } from "./entities";
import Timer from "./Timer";
import KeyboardState from "./KeyboardState";

const canvas = document.getElementById("screen") as HTMLCanvasElement;
const context = canvas.getContext("2d");

Promise.all([createMario(), loadBackGroundSpirtes(), loadLevel("1-1")]).then(
  ([mario, sprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);
    comp.layers.push(backgroundLayer);

    const gravity = 2000;

    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    const SPACE = 32;
    const input = new KeyboardState();
    input.addMapping(SPACE, keyState => {
      if (keyState) {
        mario.jump.start();
      } else {
        mario.jump.cancel();
      }
      console.log(keyState);
    });

    input.listenTo(window);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const timer = new Timer(1 / 60);

    timer.update = function(deltaTime) {
      comp.draw(context);
      mario.update(deltaTime);
      mario.vel.y += gravity * deltaTime;
    };

    timer.start();
  }
);
