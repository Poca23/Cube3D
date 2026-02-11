import CONFIG from "../config.js";

export class Cube {
  constructor() {
    this.mesh = null;
    this.geometry = null;
    this.material = null;
    this.init();
  }

  init() {
    const { size, material, position } = CONFIG.cube;

    this.geometry = new THREE.BoxGeometry(size.width, size.height, size.depth);

    this.material = new THREE.MeshStandardMaterial({
      color: material.color,
      metalness: material.metalness,
      roughness: material.roughness,
      wireframe: material.wireframe,
      flatShading: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(position.x, position.y, position.z);
    this.mesh.name = "MainCube";
  }

  getMesh() {
    return this.mesh;
  }

  animate() {
    const { speed } = CONFIG.cube.rotation;
    this.mesh.rotation.x += speed.x;
    this.mesh.rotation.y += speed.y;
  }

  setColor(color) {
    this.material.color.setHex(color);
  }

  setRotationSpeed(x, y) {
    CONFIG.cube.rotation.speed.x = x;
    CONFIG.cube.rotation.speed.y = y;
  }

  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

  setScale(scale) {
    this.mesh.scale.set(scale, scale, scale);
  }

  setWireframe(enabled) {
    this.material.wireframe = enabled;
  }

  setMaterialProperties(properties) {
    Object.assign(this.material, properties);
  }

  getPosition() {
    return {
      x: this.mesh.position.x,
      y: this.mesh.position.y,
      z: this.mesh.position.z,
    };
  }

  getRotation() {
    return {
      x: this.mesh.rotation.x,
      y: this.mesh.rotation.y,
      z: this.mesh.rotation.z,
    };
  }

  resetRotation() {
    this.mesh.rotation.set(0, 0, 0);
  }

  pulse(time) {
    const scale = 1 + Math.sin(time * 2) * 0.1;
    this.mesh.scale.set(scale, scale, scale);
  }

  dispose() {
    if (this.geometry) {
      this.geometry.dispose();
    }

    if (this.material) {
      this.material.dispose();
    }

    this.mesh = null;
  }
}

export default Cube;
