import { loadMarioSprite } from "./sprites";
import Entity from "./Entity";

export function createMario() {
  return loadMarioSprite().then(sprites => {
    const mario = new Entity();
    mario.pos.set(64, 180);
    mario.vel.set(2, -10);

    mario.update = function updateMario() {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    };

    mario.draw = function drawMario(context) {
      sprites.draw("idle", context, this.pos.x, this.pos.y);
    };
    return mario;
  });
}
