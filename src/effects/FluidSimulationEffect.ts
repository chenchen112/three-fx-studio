import { Effect } from './Effect';
import { SphereGeometry, MeshPhongMaterial, Mesh, Color } from 'three';

export class FluidSimulationEffect extends Effect {
  private fluidParticles: Mesh[];
  private time: number = 0;

  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
    this.fluidParticles = [];
  }

  init(): void {
    // 创建流体粒子
    for (let i = 0; i < 50; i++) {
      const geometry = new SphereGeometry(0.2, 16, 16);
      const material = new MeshPhongMaterial({
        color: new Color().setHSL(Math.random(), 0.7, 0.5),
        emissive: new Color().setHSL(Math.random(), 0.7, 0.3),
        emissiveIntensity: 0.5
      });

      const particle = new Mesh(geometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );

      this.scene.add(particle);
      this.fluidParticles.push(particle);
    }
  }

  update(deltaTime: number): void {
    this.time += deltaTime;

    this.fluidParticles.forEach((particle, index) => {
      // 流体动力学模拟
      particle.position.y += Math.sin(this.time + index) * 0.01;
      particle.position.x += Math.cos(this.time * 0.5 + index) * 0.005;
      particle.position.z += Math.sin(this.time * 0.3 + index) * 0.005;

      // 旋转效果
      particle.rotation.x += deltaTime * 0.5;
      particle.rotation.y += deltaTime * 0.3;

      // 颜色变化
      const material = particle.material as MeshPhongMaterial;
      material.color.setHSL(
        (this.time * 0.1 + index * 0.02) % 1,
        0.7,
        0.5
      );
    });
  }

  destroy(): void {
    this.fluidParticles.forEach(particle => {
      this.scene.remove(particle);
      particle.geometry.dispose();
      (particle.material as MeshPhongMaterial).dispose();
    });
    this.fluidParticles = [];
  }
}