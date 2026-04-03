import { Effect } from './Effect';
import { BufferGeometry, LineBasicMaterial, Line, Vector3 } from 'three';

export class LightningEffect extends Effect {
  private lightning: Line[];

  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
    this.lightning = [];
  }

  init(): void {
    // 初始闪电
    this.createLightning();
  }

  update(deltaTime: number): void {
    // 闪电闪烁效果
    this.lightning.forEach(light => {
      light.visible = Math.random() > 0.7;
    });

    // 随机创建新闪电
    if (Math.random() > 0.95) {
      this.createLightning();
    }
  }

  private createLightning(): void {
    const points: Vector3[] = [];
    const segments = 20;
    const height = 20;

    // 创建闪电路径
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = (Math.random() - 0.5) * 5;
      const y = t * height;
      const z = (Math.random() - 0.5) * 5;
      points.push(new Vector3(x, y, z));
    }

    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({
      color: 0xffff00,
      linewidth: 2
    });

    const lightning = new Line(geometry, material);
    lightning.position.set(
      (Math.random() - 0.5) * 20,
      -10,
      (Math.random() - 0.5) * 20
    );

    this.scene.add(lightning);
    this.lightning.push(lightning);

    // 闪电消失
    setTimeout(() => {
      this.scene.remove(lightning);
      geometry.dispose();
      material.dispose();
      this.lightning = this.lightning.filter(l => l !== lightning);
    }, 100);
  }

  destroy(): void {
    this.lightning.forEach(light => {
      this.scene.remove(light);
      light.geometry.dispose();
      (light.material as LineBasicMaterial).dispose();
    });
    this.lightning = [];
  }
}