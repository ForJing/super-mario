import { loadMarioSprite } from "./sprites";
import Entity, { Trait } from "./Entity";
import Velocity from "./traits/Velocity";

export function createMario() {
  return loadMarioSprite().then(sprite => {
    const mario = new Entity();

    mario.addTrait(new Velocity());

    mario.draw = function drawMario(context) {
      sprite.draw("idle", context, this.pos.x, this.pos.y);
    };
    return mario;
  });
}
