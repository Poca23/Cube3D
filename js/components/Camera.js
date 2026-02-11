import CONFIG from "../config.js";

export class Camera {
  constructor(aspect) {
    this.camera = null;
    this.aspect = aspect || window.innerWidth / window.innerHeight;
    this.init();
  }

  init() {
    const { fov, near, far, position } = CONFIG.camera;

    this.camera = new THREE.PerspectiveCamera(fov, this.aspect, near, far);
    this.camera.position.set(position.x, position.y, position.z);
    this.camera.lookAt(0, 0, 0);
  }

  getCamera() {
    return this.camera;
  }

  updateAspect(width, height) {
    this.aspect = width / height;
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
  }

  setPosition(x, y, z) {
    this.camera.position.set(x, y, z);
    this.camera.lookAt(0, 0, 0);
  }

  lookAt(x, y, z) {
    this.camera.lookAt(x, y, z);
  }

  getPosition() {
    return {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z,
    };
  }

  setFOV(fov) {
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();
  }

  animateToPosition(targetPosition, duration = 1000) {
    const startPosition = { ...this.camera.position };
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      this.camera.position.x =
        startPosition.x + (targetPosition.x - startPosition.x) * progress;
      this.camera.position.y =
        startPosition.y + (targetPosition.y - startPosition.y) * progress;
      this.camera.position.z =
        startPosition.z + (targetPosition.z - startPosition.z) * progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  dispose() {
    this.camera = null;
  }
}

export default Camera;
