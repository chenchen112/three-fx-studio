import * as THREE from 'three';

export abstract class Effect {
  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected renderer: THREE.WebGLRenderer;
  protected animationId: number | null = null;

  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
  }

  abstract init(): void;
  abstract update(deltaTime: number): void;
  abstract destroy(): void;

  startAnimation(): void {
    const animate = (time: number) => {
      this.update(time * 0.001);
      this.renderer.render(this.scene, this.camera);
      this.animationId = requestAnimationFrame(animate);
    };
    animate(0);
  }

  stopAnimation(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}