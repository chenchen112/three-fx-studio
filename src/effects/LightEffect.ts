import { Effect } from './Effect';
import { SpotLight } from 'three';

export class LightEffect extends Effect {
  private lights: SpotLight[] = [];

  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
  }

  init(): void {
    const light = new SpotLight(0xffffff, 2, 100);
    this.lights.push(light);
    this.scene.add(light);
  }

  update(deltaTime: number): void {
    if (!this.lights.length) return;

    this.lights.forEach(light => {
      light.position.x += Math.sin(Date.now() * 0.001) * 0.01;
    });
  }

  destroy(): void {
    this.lights.forEach(light => this.scene.remove(light));
    this.lights = [];
  }
}