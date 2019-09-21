import { loadMarioSprite } from "./sprites";
import Entity from "./Entity";

export function createMario() {
  return loadMarioSprite().then(sprites => {
    const mario = new Entity();

    mario.update = function updateMario(deltaTime) {
      this.pos.x += this.vel.x * deltaTime;
      this.pos.y += this.vel.y * deltaTime;
    };

    mario.draw = function drawMario(context) {
      sprites.draw("idle", context, this.pos.x, this.pos.y);
    };
    return mario;
  });
}
