import Entity, { Trait } from "../Entity";

export default class Jump extends Trait {
  duration: number;
  velocity: number;
  engageTime: number;

  constructor() {
    super("jump");
    this.duration = 0.5;
    this.velocity = 200;
    this.engageTime = 0;
  }

  start() {
    this.engageTime = this.duration;
  }

  cancel() {
    this.engageTime = 0;
  }

  update(entity: Entity, deltaTime) {
    if (this.engageTime > 0) {
      entity.vel.y -= this.velocity;
      this.engageTime -= deltaTime;
    }
  }
}
