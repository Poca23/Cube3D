import CONFIG from "../config.js";

export class Cube {
  constructor() {
    this.mesh = null;
    this.geometry = null;
    this.material = null;
    this.velocity = {
      x: (Math.random() - 0.5) * CONFIG.cube.movement.speed * 2,
      y: (Math.random() - 0.5) * CONFIG.cube.movement.speed * 2,
    };
    this.waveTime = 0;
    this.isWaving = false;
    this.originalPositions = null;
    this.init();
  }

  init() {
    const { size, material, position } = CONFIG.cube;

    this.geometry = new THREE.BoxGeometry(
      size.width,
      size.height,
      size.depth,
      8,
      8,
      8,
    );

    this.material = new THREE.MeshStandardMaterial({
      color: material.color,
      metalness: material.metalness,
      roughness: material.roughness,
      wireframe: material.wireframe,
      flatShading: false,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(position.x, position.y, position.z);
    this.mesh.name = "MainCube";

    this.originalPositions = this.geometry.attributes.position.array.slice();
  }

  getMesh() {
    return this.mesh;
  }

  animate() {
    const { speed } = CONFIG.cube.rotation;
    this.mesh.rotation.x += speed.x;
    this.mesh.rotation.y += speed.y;

    this.updatePosition();
    this.updateWaveEffect();
  }

  updatePosition() {
    const bounds = CONFIG.cube.movement.bounds;

    this.mesh.position.x += this.velocity.x;
    this.mesh.position.y += this.velocity.y;

    if (Math.abs(this.mesh.position.x) > bounds.x) {
      this.velocity.x *= -1;
      this.mesh.position.x = Math.sign(this.mesh.position.x) * bounds.x;
    }

    if (Math.abs(this.mesh.position.y) > bounds.y) {
      this.velocity.y *= -1;
      this.mesh.position.y = Math.sign(this.mesh.position.y) * bounds.y;
    }
  }

  reverseDirection() {
    this.velocity.x *= -1;
    this.velocity.y *= -1;
    this.startWave();
  }

  startWave() {
    this.isWaving = true;
    this.waveTime = 0;
  }

  updateWaveEffect() {
    if (!this.isWaving) return;

    const { waveAmplitude, waveDuration, waveFrequency } = CONFIG.collision;
    this.waveTime += 0.016;

    if (this.waveTime > waveDuration) {
      this.isWaving = false;
      this.resetGeometry();
      return;
    }

    const positions = this.geometry.attributes.position.array;
    const progress = this.waveTime / waveDuration;
    const decay = 1 - progress;

    for (let i = 0; i < positions.length; i += 3) {
      const x = this.originalPositions[i];
      const y = this.originalPositions[i + 1];
      const z = this.originalPositions[i + 2];

      const distance = Math.sqrt(x * x + y * y + z * z);
      const wave =
        Math.sin(distance * waveFrequency - this.waveTime * 10) *
        waveAmplitude *
        decay;

      positions[i] = x + x * wave;
      positions[i + 1] = y + y * wave;
      positions[i + 2] = z + z * wave;
    }

    this.geometry.attributes.position.needsUpdate = true;
  }

  resetGeometry() {
    const positions = this.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i++) {
      positions[i] = this.originalPositions[i];
    }
    this.geometry.attributes.position.needsUpdate = true;
  }

  getPosition() {
    return {
      x: this.mesh.position.x,
      y: this.mesh.position.y,
      z: this.mesh.position.z,
    };
  }

  getVelocity() {
    return { ...this.velocity };
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
