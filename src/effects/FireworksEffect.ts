import { Effect } from './Effect';
import { BufferGeometry, Float32BufferAttribute, PointsMaterial, Points } from 'three';

export class FireworksEffect extends Effect {
  private fireworks: Points[];
  private particles: number = 1000;

  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
    this.fireworks = [];
  }

  init(): void {
    // 创建多个烟花
    for (let i = 0; i < 5; i++) {
      const geometry = new BufferGeometry();
      const positions = new Float32Array(this.particles * 3);

      for (let j = 0; j < this.particles; j++) {
        positions[j * 3] = 0;
        positions[j * 3 + 1] = 0;
        positions[j * 3 + 2] = 0;
      }

      geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));

      const material = new PointsMaterial({
        color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
        size: 0.05
      });

      const firework = new Points(geometry, material);
      firework.position.set(
        (Math.random() - 0.5) * 20,
        -10,
        (Math.random() - 0.5) * 20
      );

      this.scene.add(firework);
      this.fireworks.push(firework);
    }
  }

  update(deltaTime: number): void {
    this.fireworks.forEach(firework => {
      const positions = firework.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += deltaTime * 5; // 向上移动
        positions[i] += (Math.random() - 0.5) * deltaTime * 2; // 横向扩散
        positions[i + 2] += (Math.random() - 0.5) * deltaTime * 2; // 深度扩散

        // 淡出效果
        if (positions[i + 1] > 5) {
          positions[i + 1] = -10;
          positions[i] = (Math.random() - 0.5) * 20;
          positions[i + 2] = (Math.random() - 0.5) * 20;
        }
      }

      firework.geometry.attributes.position.needsUpdate = true;
    });
  }

  destroy(): void {
    this.fireworks.forEach(firework => {
      this.scene.remove(firework);
      firework.geometry.dispose();
      (firework.material as PointsMaterial).dispose();
    });
    this.fireworks = [];
  }
}