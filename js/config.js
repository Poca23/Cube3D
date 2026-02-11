export const CONFIG = {
  renderer: {
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  },

  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: {
      x: 0,
      y: 0,
      z: 5,
    },
  },

  cube: {
    size: {
      width: 2,
      height: 2,
      depth: 2,
    },
    material: {
      color: 0x6c5ce7,
      metalness: 0.3,
      roughness: 0.4,
      wireframe: false,
    },
    rotation: {
      speed: {
        x: 0.01,
        y: 0.01,
      },
    },
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },

  lights: {
    ambient: {
      color: 0xffffff,
      intensity: 0.5,
    },
    directional: {
      color: 0xffffff,
      intensity: 0.8,
      position: {
        x: 5,
        y: 5,
        z: 5,
      },
    },
    point: {
      enabled: true,
      color: 0x00d4ff,
      intensity: 1,
      distance: 10,
      position: {
        x: -3,
        y: 2,
        z: 3,
      },
    },
  },

  scene: {
    background: null,
    fog: {
      enabled: false,
      color: 0x1a1a2e,
      near: 1,
      far: 10,
    },
  },

  responsive: {
    breakpoints: {
      mobile: 640,
      tablet: 768,
      desktop: 1024,
      wide: 1280,
    },
    updateOnResize: true,
    debounceDelay: 250,
  },

  performance: {
    targetFPS: 60,
    enableStats: false,
    adaptivePixelRatio: true,
  },

  selectors: {
    canvasContainer: "#canvas-container",
  },

  animation: {
    pulse: true,
    lightRotation: true,
  },

  debug: false,
};

export function updateConfig(customConfig) {
  return deepMerge(CONFIG, customConfig);
}

function deepMerge(target, source) {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
}

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export default CONFIG;
