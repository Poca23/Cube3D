export class Sphere {
  constructor() {
    this.mesh = null;
    this.geometry = null;
    this.material = null;
    this.init();
  }

  init() {
    this.geometry = new THREE.SphereGeometry(1.5, 32, 32);

    this.material = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      metalness: 0.1,
      roughness: 0.9,
      flatShading: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0, 0);
    this.mesh.name = "MainSphere";
  }

  getMesh() {
    return this.mesh;
  }

  animate() {
    this.mesh.rotation.y += 0.005;
  }

  dispose() {
    if (this.geometry) this.geometry.dispose();
    if (this.material) this.material.dispose();
    this.mesh = null;
  }
}

export default Sphere;
