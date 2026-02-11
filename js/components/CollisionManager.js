import CONFIG from "../config.js";

export class CollisionManager {
  constructor() {
    this.objects = [];
  }

  addObject(object) {
    this.objects.push(object);
  }

  checkCollisions() {
    if (!CONFIG.collision.enabled || this.objects.length < 2) return;

    for (let i = 0; i < this.objects.length; i++) {
      for (let j = i + 1; j < this.objects.length; j++) {
        this.checkCollision(this.objects[i], this.objects[j]);
      }
    }
  }

  checkCollision(obj1, obj2) {
    const pos1 = obj1.getPosition();
    const pos2 = obj2.getPosition();

    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const mesh1 = obj1.getMesh();
    const mesh2 = obj2.getMesh();

    let radius1, radius2;

    if (mesh1.geometry.type === "BoxGeometry") {
      radius1 = CONFIG.cube.size.width / 2;
    } else {
      radius1 = CONFIG.sphere.radius;
    }

    if (mesh2.geometry.type === "BoxGeometry") {
      radius2 = CONFIG.cube.size.width / 2;
    } else {
      radius2 = CONFIG.sphere.radius;
    }

    const minDistance = radius1 + radius2;

    if (distance < minDistance) {
      this.handleCollision(obj1, obj2);
    }
  }

  handleCollision(obj1, obj2) {
    obj1.reverseDirection();
    obj2.reverseDirection();

    const pos1 = obj1.getPosition();
    const pos2 = obj2.getPosition();
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      const overlap = 0.05;
      const separationX = (dx / distance) * overlap;
      const separationY = (dy / distance) * overlap;

      obj1.getMesh().position.x += separationX;
      obj1.getMesh().position.y += separationY;
      obj2.getMesh().position.x -= separationX;
      obj2.getMesh().position.y -= separationY;
    }
  }

  dispose() {
    this.objects = [];
  }
}

export default CollisionManager;
