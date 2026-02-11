import CONFIG from "../config.js";

export class Renderer {
  constructor(container) {
    this.renderer = null;
    this.container = container;
    this.init();
  }

  init() {
    const { antialias, alpha, powerPreference, pixelRatio } = CONFIG.renderer;

    this.renderer = new THREE.WebGLRenderer({
      antialias,
      alpha,
      powerPreference,
    });

    this.renderer.setPixelRatio(pixelRatio);
    this.updateSize();
    this.container.appendChild(this.renderer.domElement);
    this.container.classList.add("loaded");
  }

  getRenderer() {
    return this.renderer;
  }

  updateSize(width, height) {
    const w = width || this.container.clientWidth;
    const h = height || this.container.clientHeight;

    this.renderer.setSize(w, h);
  }

  render(scene, camera) {
    if (!scene || !camera) {
      console.error("Scene or camera missing for render");
      return;
    }

    this.renderer.render(scene, camera);
  }

  setPixelRatio(ratio) {
    this.renderer.setPixelRatio(ratio);
  }

  setAntialias(enabled) {
    console.warn("Changing antialias requires renderer recreation");
  }

  getInfo() {
    return {
      memory: this.renderer.info.memory,
      render: this.renderer.info.render,
      programs: this.renderer.info.programs,
    };
  }

  screenshot() {
    return this.renderer.domElement.toDataURL("image/png");
  }

  dispose() {
    if (this.renderer) {
      this.renderer.dispose();

      if (this.renderer.domElement && this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(
          this.renderer.domElement,
        );
      }

      this.renderer = null;
    }
  }
}

export default Renderer;
