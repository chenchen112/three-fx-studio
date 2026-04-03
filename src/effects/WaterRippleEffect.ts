import { Effect } from './Effect';
import { PlaneGeometry, ShaderMaterial, Mesh } from 'three';

export class WaterRippleEffect extends Effect {
  private mesh: Mesh;
  private material: ShaderMaterial;

  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
    const geometry = new PlaneGeometry(20, 20, 50, 50);
    this.material = new ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        amplitude: { value: 0.1 },
        frequency: { value: 2 }
      },
      vertexShader: `
        uniform float time;
        uniform float amplitude;
        uniform float frequency;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.y += sin(uv.x * frequency + time) * amplitude;
          pos.z += cos(uv.y * frequency + time) * amplitude;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          vec3 color = vec3(0.0, 0.5, 1.0);
          gl_FragColor = vec4(color, 0.8);
        }
      `
    });
    this.mesh = new Mesh(geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
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