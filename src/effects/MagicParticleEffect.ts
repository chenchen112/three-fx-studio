import { Effect } from './Effect';
import { BufferGeometry, Float32BufferAttribute, PointsMaterial, Points } from 'three';

export class MagicParticleEffect extends Effect {
  private particles: Points;
  private geometry: BufferGeometry;
  private material: PointsMaterial;

  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
    this.geometry = new BufferGeometry();
    this.material = new PointsMaterial({
      color: 0x00ff00,
      size: 0.2,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    this.particles = new Points(this.geometry, this.material);
    this.scene.add(this.particles);
  }

  init(): void {
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // 魔法颜色
      const color = new THREE.Color();
      color.setHSL(Math.random(), 1, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    this.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    this.material.vertexColors = true;
  }

  update(deltaTime: number): void {
    const positions = this.geometry.attributes.position.array as Float32Array;
    const colors = this.geometry.attributes.color.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      // 魔法粒子运动
      positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.01;
      positions[i + 1] += Math.cos(Date.now() * 0.001 + i) * 0.01;
      positions[i + 2] += Math.sin(Date.now() * 0.002 + i) * 0.01;

      // 颜色变化
      const color = new THREE.Color();
      color.setHSL(
        (Date.now() * 0.0001 + i * 0.001) % 1,
        1,
        0.5
      );
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
  }

  destroy(): void {
    this.scene.remove(this.particles);
    this.geometry.dispose();
    this.material.dispose();
  }
}