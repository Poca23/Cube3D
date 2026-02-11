import CONFIG from "../config.js";

export class Lights {
  constructor() {
    this.ambientLight = null;
    this.directionalLight = null;
    this.pointLight = null;
    this.lights = [];
    this.init();
  }

  init() {
    this.createAmbientLight();
    this.createDirectionalLight();

    if (CONFIG.lights.point.enabled) {
      this.createPointLight();
    }
  }

  createAmbientLight() {
    const { color, intensity } = CONFIG.lights.ambient;

    this.ambientLight = new THREE.AmbientLight(color, intensity);
    this.ambientLight.name = "AmbientLight";

    this.lights.push(this.ambientLight);
  }

  createDirectionalLight() {
    const { color, intensity, position } = CONFIG.lights.directional;

    this.directionalLight = new THREE.DirectionalLight(color, intensity);
    this.directionalLight.position.set(position.x, position.y, position.z);
    this.directionalLight.name = "DirectionalLight";

    this.lights.push(this.directionalLight);
  }

  createPointLight() {
    const { color, intensity, distance, position } = CONFIG.lights.point;

    this.pointLight = new THREE.PointLight(color, intensity, distance);
    this.pointLight.position.set(position.x, position.y, position.z);
    this.pointLight.name = "PointLight";

    this.lights.push(this.pointLight);
  }

  getLights() {
    return this.lights;
  }

  addToScene(scene) {
    this.lights.forEach((light) => {
      scene.add(light);
    });
  }

  setAmbientIntensity(intensity) {
    if (this.ambientLight) {
      this.ambientLight.intensity = intensity;
    }
  }

  setDirectionalIntensity(intensity) {
    if (this.directionalLight) {
      this.directionalLight.intensity = intensity;
    }
  }

  setDirectionalPosition(x, y, z) {
    if (this.directionalLight) {
      this.directionalLight.position.set(x, y, z);
    }
  }

  animatePointLight(time) {
    if (this.pointLight) {
      const radius = 5;
      this.pointLight.position.x = Math.cos(time) * radius;
      this.pointLight.position.y = 3;
      this.pointLight.position.z = Math.sin(time) * radius;
    }
  }

  togglePointLight(enabled) {
    if (this.pointLight) {
      this.pointLight.visible = enabled;
    }
  }

  setColor(lightType, color) {
    const lightMap = {
      ambient: this.ambientLight,
      directional: this.directionalLight,
      point: this.pointLight,
    };

    const light = lightMap[lightType];
    if (light) {
      light.color.setHex(color);
    }
  }

  getInfo() {
    return {
      ambient: this.ambientLight
        ? {
            intensity: this.ambientLight.intensity,
            color: this.ambientLight.color.getHex(),
          }
        : null,
      directional: this.directionalLight
        ? {
            intensity: this.directionalLight.intensity,
            position: this.directionalLight.position,
            color: this.directionalLight.color.getHex(),
          }
        : null,
      point: this.pointLight
        ? {
            intensity: this.pointLight.intensity,
            position: this.pointLight.position,
            color: this.pointLight.color.getHex(),
          }
        : null,
    };
  }

  dispose() {
    this.lights.forEach((light) => {
      if (light.dispose) {
        light.dispose();
      }
    });

    this.lights = [];
    this.ambientLight = null;
    this.directionalLight = null;
    this.pointLight = null;
  }
}

export default Lights;
