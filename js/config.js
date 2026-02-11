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
      z: 8,
    },
  },

  cube: {
    size: {
      width: 0.8,
      height: 0.8,
      depth: 0.8,
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
      x: -2,
      y: 0,
      z: 0,
    },
    movement: {
      speed: 0.02,
      bounds: {
        x: 3.5,
        y: 2.5,
      },
    },
  },

  sphere: {
    radius: 0.5,
    segments: 32,
    material: {
      color: 0x00d4ff,
      metalness: 0.3,
      roughness: 0.4,
    },
    position: {
      x: 2,
      y: 0,
      z: 0,
    },
    movement: {
      speed: 0.025,
      bounds: {
        x: 3.5,
        y: 2.5,
      },
    },
  },

  collision: {
    enabled: true,
    waveAmplitude: 0.15,
    waveDuration: 1.0,
    waveFrequency: 8,
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

  animation: {
    pulse: false,
    lightRotation: true,
  },

  selectors: {
    canvasContainer: "#canvas-container",
  },

  debug: false,
};

export default CONFIG;
