import { Effect } from './Effect';
import { BufferGeometry, Float32BufferAttribute, PointsMaterial, Points } from 'three';

export class StarFieldEffect extends Effect {
  private stars: Points;
  private geometry: BufferGeometry;
  private material: PointsMaterial;

  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
    this.geometry = new BufferGeometry();
    this.material = new PointsMaterial({
      color: 0xffffff,
      size: 0.05
    });
    this.stars = new Points(this.geometry, this.material);
    this.scene.add(this.stars);
  }

  init(): void {
    const starCount = 5000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    this.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  }

  update(deltaTime: number): void {
    // 星星闪烁效果
    this.material.opacity = 0.5 + Math.sin(Date.now() * 0.001) * 0.5;
  }

  destroy(): void {
    this.scene.remove(this.stars);
    this.geometry.dispose();
    this.material.dispose();
  }
}