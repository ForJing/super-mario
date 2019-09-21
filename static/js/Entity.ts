import { Vec2 } from "./math";

class Entity {
  pos: Vec2;
  vel: Vec2;

  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
  }

  update() {}
  draw(context: CanvasRenderingContext2D) {}
}

export default Entity;
