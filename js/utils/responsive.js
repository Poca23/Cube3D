import CONFIG from "../config.js";

export class ResponsiveManager {
  constructor() {
    this.breakpoints = CONFIG.responsive.breakpoints;
    this.debounceDelay = CONFIG.responsive.debounceDelay;
    this.resizeCallbacks = [];
    this.resizeTimeout = null;
    this.currentBreakpoint = this.getCurrentBreakpoint();

    this.init();
  }

  init() {
    if (CONFIG.responsive.updateOnResize) {
      window.addEventListener("resize", this.handleResize.bind(this));
      window.addEventListener(
        "orientationchange",
        this.handleOrientationChange.bind(this),
      );
    }
  }

  handleResize() {
    clearTimeout(this.resizeTimeout);

    this.resizeTimeout = setTimeout(() => {
      const newBreakpoint = this.getCurrentBreakpoint();

      if (newBreakpoint !== this.currentBreakpoint) {
        this.currentBreakpoint = newBreakpoint;
      }

      this.executeCallbacks();
    }, this.debounceDelay);
  }

  handleOrientationChange() {
    setTimeout(() => {
      this.executeCallbacks();
    }, 100);
  }

  onResize(callback) {
    if (typeof callback === "function") {
      this.resizeCallbacks.push(callback);
    }
  }

  executeCallbacks() {
    const dimensions = this.getDimensions();
    this.resizeCallbacks.forEach((callback) => callback(dimensions));
  }

  getCurrentBreakpoint() {
    const width = window.innerWidth;

    if (width < this.breakpoints.mobile) return "mobile";
    if (width < this.breakpoints.tablet) return "tablet";
    if (width < this.breakpoints.desktop) return "desktop";
    if (width < this.breakpoints.wide) return "wide";
    return "ultrawide";
  }

  getDimensions() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      breakpoint: this.currentBreakpoint,
      isMobile: this.isMobile(),
      isPortrait: this.isPortrait(),
      pixelRatio: window.devicePixelRatio || 1,
    };
  }

  isMobile() {
    return window.innerWidth < this.breakpoints.tablet;
  }

  isPortrait() {
    return window.innerHeight > window.innerWidth;
  }

  getOptimalPixelRatio() {
    const dpr = window.devicePixelRatio || 1;

    if (this.isMobile()) {
      return Math.min(dpr, 1.5);
    }

    return Math.min(dpr, 2);
  }

  getDeviceCapabilities() {
    return {
      touchEnabled: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      webGLSupported: this.isWebGLSupported(),
      performanceLevel: this.estimatePerformanceLevel(),
    };
  }

  isWebGLSupported() {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  }

  estimatePerformanceLevel() {
    const isMobile = this.isMobile();
    const cores = navigator.hardwareConcurrency || 2;
    const memory = navigator.deviceMemory || 4;

    if (isMobile && (cores < 4 || memory < 4)) return "low";
    if (cores >= 8 && memory >= 8) return "high";
    return "medium";
  }

  destroy() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener(
      "orientationchange",
      this.handleOrientationChange,
    );
    clearTimeout(this.resizeTimeout);
    this.resizeCallbacks = [];
  }
}

export default new ResponsiveManager();
