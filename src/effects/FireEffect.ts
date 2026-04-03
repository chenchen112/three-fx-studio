import { Effect } from './Effect';
import { BufferGeometry, Float32BufferAttribute, PointsMaterial, Points } from 'three';

export class FireEffect extends Effect {
  private fire: Points;
  private geometry: BufferGeometry;
  private material: PointsMaterial;

  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
    this.geometry = new BufferGeometry();
    this.material = new PointsMaterial({
      color: 0xff6600,
      size: 0.3,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    this.fire = new Points(this.geometry, this.material);
    this.scene.add(this.fire);
  }

  init(): void {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      // 火焰颜色渐变
      const color = new THREE.Color();
      const t = Math.random();
      if (t < 0.5) {
        color.setHSL(0, 1, 0.5 + t); // 橙色到黄色
      } else {
        color.setHSL(0.1, 1, 0.3 + t * 0.3); // 黄色到红色
      }
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
      // 火焰上升和扩散
      positions[i + 1] += deltaTime * 2;
      positions[i] += (Math.random() - 0.5) * deltaTime;
      positions[i + 2] += (Math.random() - 0.5) * deltaTime;

      // 淡出效果
      if (positions[i + 1] > 10) {
        positions[i] = 0;
        positions[i + 1] = 0;
        positions[i + 2] = 0;
      }

      // 颜色变化
      const t = positions[i + 1] / 10;
      const color = new THREE.Color();
      if (t < 0.5) {
        color.setHSL(0, 1, 0.5 + t); // 橙色到黄色
      } else {
        color.setHSL(0.1, 1, 0.3 + t * 0.3); // 黄色到红色
      }
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
  }

  destroy(): void {
    this.scene.remove(this.fire);
    this.geometry.dispose();
    this.material.dispose();
  }
}