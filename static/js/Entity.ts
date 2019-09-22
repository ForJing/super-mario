import { Vec2 } from "./math";

export class Trait {
  NAME: string;
  constructor(name) {
    this.NAME = name;
  }

  update(entity, deltaTime) {
    console.warn("Unhanled update call in Trait");
  }
}

class Entity {
  pos: Vec2;
  vel: Vec2;
  traits: Array<any>;

  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.traits = [];
  }

  addTrait(trait) {
    this.traits.push(trait);
  }

  update(deltaTime) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime);
    });
  }

  draw(context: CanvasRenderingContext2D) {}
  jump?;
}

export default Entity;
