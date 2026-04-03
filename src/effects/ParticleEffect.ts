import { Effect } from './Effect';
import * as THREE from 'three';

export class ParticleEffect extends Effect {
  private particles: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    super(scene, camera, renderer);
    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.PointsMaterial({
      color: 0xff0000,
      size: 0.1
    });
    this.particles = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.particles);
  }

  init(): void {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  }

  update(deltaTime: number): void {
    this.particles.rotation.y += 0.001;
  }

  destroy(): void {
    this.scene.remove(this.particles);
    this.geometry.dispose();
    this.material.dispose();
  }
}