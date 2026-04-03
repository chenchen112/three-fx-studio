import { Effect } from './Effect';
import { TubeGeometry, MeshBasicMaterial, Mesh, Color } from 'three';

export class NeonEffect extends Effect {
  private neonLights: Mesh[];

  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
    this.neonLights = [];
  }

  init(): void {
    // 创建霓虹灯管
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, 0, 0),
      new THREE.Vector3(-3, 2, 1),
      new THREE.Vector3(0, 0, 2),
      new THREE.Vector3(3, -2, 1),
      new THREE.Vector3(5, 0, 0)
    ]);

    const geometry = new TubeGeometry(curve, 64, 0.1, 8, false);
    const material = new MeshBasicMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 1
    });

    const neonLight = new Mesh(geometry, material);
    this.scene.add(neonLight);
    this.neonLights.push(neonLight);
  }

  update(deltaTime: number): void {
    this.neonLights.forEach(light => {
      light.rotation.z += deltaTime * 0.5;
      light.material.color.setHSL(
        (Date.now() * 0.0001) % 1,
        1,
        0.5
      );
    });
  }

  destroy(): void {
    this.neonLights.forEach(light => {
      this.scene.remove(light);
      light.geometry.dispose();
      (light.material as MeshBasicMaterial).dispose();
    });
    this.neonLights = [];
  }
}