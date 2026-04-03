import { Effect } from './Effect';
import { ShaderMaterial, PlaneGeometry, Mesh } from 'three';

export class MaterialEffect extends Effect {
  private material: ShaderMaterial;
  private mesh: Mesh;

  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
    const geometry = new PlaneGeometry(10, 10);
    this.material = new ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vec3 color = vec3(sin(time) * 0.5 + 0.5, cos(time) * 0.5 + 0.5, 0.5);
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
    this.mesh = new Mesh(geometry, this.material);
    this.scene.add(this.mesh);
  }

  init(): void {}

  update(deltaTime: number): void {
    this.material.uniforms.time.value += deltaTime;
  }

  destroy(): void {
    this.scene.remove(this.mesh);
    this.material.dispose();
    this.mesh.geometry.dispose();
  }
}