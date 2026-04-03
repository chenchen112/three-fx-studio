import { Effect } from './Effect';
import * as THREE from 'three';

export class EffectManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private currentEffect: Effect | null = null;
  private effects: Map<string, new (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => Effect>;
  private lastTime: number = 0;
  private fps: number = 60;
  private frameCount: number = 0;
  private lastFpsUpdate: number = 0;

  constructor() {
    // 初始化 Three.js 场景
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    // 初始化相机
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // 初始化渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // 注册所有特效类型
    this.effects = new Map();
    this.registerEffects();
  }

  public getFPS(): number {
    return this.fps;
  }

  private registerEffects(): void {
    // 注册所有特效类
    this.effects.set('particle', ParticleEffect);
    this.effects.set('fireworks', FireworksEffect);
    this.effects.set('light', LightEffect);
    this.effects.set('neon', NeonEffect);
    this.effects.set('material', MaterialEffect);
    this.effects.set('water', WaterRippleEffect);
    this.effects.set('fluid', FluidSimulationEffect);
    this.effects.set('starfield', StarFieldEffect);
    this.effects.set('fire', FireEffect);
    this.effects.set('lightning', LightningEffect);
    this.effects.set('magic', MagicParticleEffect);
  }

  public getRenderer(): WebGLRenderer {
    return this.renderer;
  }

  public getScene(): Scene {
    return this.scene;
  }

  public getCamera(): PerspectiveCamera {
    return this.camera;
  }

  public createEffect(effectType: string): Effect | null {
    const EffectClass = this.effects.get(effectType);
    if (!EffectClass) {
      console.error(`未找到特效类型: ${effectType}`);
      return null;
    }

    // 销毁当前特效
    if (this.currentEffect) {
      this.currentEffect.destroy();
    }

    // 清理场景中的旧对象
    this.cleanupScene();

    // 创建新特效
    this.currentEffect = new EffectClass(this.scene, this.camera, this.renderer);
    this.currentEffect.init();

    return this.currentEffect;
  }

  private cleanupScene(): void {
    // 移除所有非特效对象
    const objectsToRemove: THREE.Object3D[] = [];
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Light) {
        objectsToRemove.push(object);
      }
    });

    objectsToRemove.forEach(object => {
      this.scene.remove(object);
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        }
      } else if (object instanceof THREE.Points) {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        }
      } else if (object instanceof THREE.Light) {
        // 灯光不需要特殊清理
      }
    });
  }

  public startEffect(): void {
    if (this.currentEffect) {
      this.currentEffect.startAnimation();
    }
  }

  public stopEffect(): void {
    if (this.currentEffect) {
      this.currentEffect.stopAnimation();
    }
  }

  public updateEffect(deltaTime: number): void {
    if (this.currentEffect) {
      this.currentEffect.update(deltaTime);
    }

    // 更新帧计数
    this.frameCount++;

    // 每 1000ms 更新一次 FPS
    const currentTime = performance.now();
    if (currentTime - this.lastFpsUpdate >= 1000) {
      this.fps = Math.round(this.frameCount * 1000 / (currentTime - this.lastFpsUpdate));
      this.frameCount = 0;
      this.lastFpsUpdate = currentTime;
    }
  }

  public resize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public dispose(): void {
    if (this.currentEffect) {
      this.currentEffect.destroy();
    }
    this.renderer.dispose();

    // 清理 Three.js 资源
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        }
      }
    });
  }

  public getEffectTypes(): string[] {
    return Array.from(this.effects.keys());
  }
}