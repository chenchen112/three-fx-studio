# Three FX Studio 设计文档

## 类型定义

```typescript
export interface EffectType {
  id: number;
  name: string;
  type: 'particle' | 'light' | 'material' | 'animation';
  description: string;
}
```

## 项目概述

Three FX Studio 是一个基于 Vue 3 + Vite + TypeScript 开发的三维特效展示 web 服务。该项目使用 pnpm 作为包管理器，通过直接导入 Three.js 模块来避免全局命名空间污染，提供更好的 Tree Shaking 支持。

## 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite
- **编程语言**: TypeScript
- **样式方案**: Tailwind CSS
- **三维引擎**: Three.js
- **包管理器**: pnpm

## 项目结构

```
three-fx-studio/
├── public/                 # 静态资源
│   └── favicon.ico
├── src/
│   ├── components/         # Vue 组件
│   │   ├── EffectCard.vue   # 特效卡片组件
│   │   └── FullscreenView.vue # 全屏视图组件
│   ├── effects/           # 特效实现
│   │   ├── Effect.ts      # 特效基类
│   │   ├── ParticleEffect.ts # 粒子特效
│   │   ├── LightEffect.ts  # 光效
│   │   ├── MaterialEffect.ts # 材质效果
│   │   └── AnimationEffect.ts # 动画效果
│   ├── views/             # 页面视图
│   │   ├── Home.vue       # 主页
│   │   └── EffectDetail.vue # 特效详情页
│   ├── assets/            # 资源文件
│   │   └── styles/        # 样式文件
│   ├── App.vue            # 根组件
│   ├── main.ts            # 入口文件
│   └── router/            # 路由配置
│       └── index.ts
├── package.json
├── pnpm-workspace.yaml    # pnpm 工作区配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
└── README.md
```

### 全屏视图 (FullscreenView.vue) - 极客风格设计

```vue
<template>
  <div class="cyber-fullscreen">
    <div class="cyber-effect-display" ref="effectDisplay">
      <!-- 特效展示区域 -->
    </div>
    
    <div class="cyber-controls">
      <div class="cyber-hud">
        <div class="cyber-info">
          <h2 class="cyber-title">{{ effectName }}</h2>
          <p class="cyber-subtitle">{{ effectDescription }}</p>
        </div>
        
        <div class="cyber-stats">
          <div class="cyber-stat">
            <span class="cyber-label">FPS:</span>
            <span class="cyber-value">{{ fps }}</span>
          </div>
          <div class="cyber-stat">
            <span class="cyber-label">Particles:</span>
            <span class="cyber-value">{{ particleCount }}</span>
          </div>
        </div>
      </div>
      
      <div class="cyber-buttons">
        <button class="cyber-btn" @click="toggleAnimation">
          <span v-if="isPlaying">⏸️ 暂停</span>
          <span v-else>▶️ 播放</span>
        </button>
        <button class="cyber-btn" @click="resetEffect">🔄 重置</button>
        <button class="cyber-btn" @click="toggleFullscreen">🖥️ 全屏</button>
      </div>
    </div>
    
    <div class="cyber-overlay" v-if="showOverlay">
      <div class="cyber-overlay-content">
        <h3 class="cyber-overlay-title">交互控制</h3>
        <p class="cyber-overlay-text">使用鼠标控制视角，滚轮缩放</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Effect } from '@/effects/Effect';

const effectDisplay = ref<HTMLElement | null>(null);
const effectName = ref('特效名称');
const effectDescription = ref('特效描述');
const isPlaying = ref(true);
const fps = ref(60);
const particleCount = ref(0);
const showOverlay = ref(true);

const toggleAnimation = () => {
  isPlaying.value = !isPlaying.value;
  // 实现动画控制逻辑
};

const resetEffect = () => {
  // 实现重置逻辑
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

// 鼠标交互控制
const handleMouseMove = (e: MouseEvent) => {
  if (effectDisplay.value) {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    // 实现视角控制逻辑
  }
};

const handleWheel = (e: WheelEvent) => {
  // 实现缩放控制逻辑
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('wheel', handleWheel);
  
  // 3秒后隐藏覆盖层
  setTimeout(() => {
    showOverlay.value = false;
  }, 3000);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('wheel', handleWheel);
});
</script>

<style>
.cyber-fullscreen {
  width: 100vw;
  height: 100vh;
  background: radial-gradient(ellipse at center, #0a0a2e 0%, #000000 100%);
  overflow: hidden;
  position: relative;
}

.cyber-effect-display {
  width: 100%;
  height: 100%;
  position: relative;
}

.cyber-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cyber-hud {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cyber-info {
  color: #00ff88;
}

.cyber-title {
  font-size: 2rem;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.cyber-subtitle {
  font-size: 1rem;
  margin: 5px 0 0;
  color: #00ffff;
}

.cyber-stats {
  display: flex;
  gap: 30px;
}

.cyber-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cyber-label {
  font-size: 0.8rem;
  color: #888;
}

.cyber-value {
  font-size: 1.2rem;
  color: #fff;
  font-weight: bold;
}

.cyber-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.cyber-btn {
  background: linear-gradient(135deg, #00ff88, #00ffff);
  border: none;
  color: #000;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
}

.cyber-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 255, 136, 0.5);
}

.cyber-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  transition: opacity 0.5s ease;
}

.cyber-overlay-content {
  text-align: center;
  color: #00ff88;
}

.cyber-overlay-title {
  font-size: 2rem;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.cyber-overlay-text {
  font-size: 1.2rem;
  margin: 10px 0 0;
  color: #00ffff;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}

/* 鼠标指针样式 */
body {
  cursor: crosshair;
}

/* 添加黑客风格效果 */
@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

.cyber-glitch {
  animation: glitch 2s infinite;
}
</style>

## 特效系统设计

### Effect 基类

```typescript
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

export abstract class Effect {
  protected scene: Scene;
  protected camera: PerspectiveCamera;
  protected renderer: WebGLRenderer;
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
```

### 粒子特效

```typescript
import { Effect } from './Effect';
import { BufferGeometry, Float32BufferAttribute, PointsMaterial, Points } from 'three';

export class ParticleEffect extends Effect {
  private particles: Points;
  private geometry: BufferGeometry;
  private material: PointsMaterial;
  
  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
    this.geometry = new BufferGeometry();
    this.material = new PointsMaterial({
      color: 0xff0000,
      size: 0.1
    });
    this.particles = new Points(this.geometry, this.material);
    this.scene.add(this.particles);
  }
  
  init(): void {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    this.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  }
  
  update(deltaTime: number): void {
    this.particles.rotation.y += 0.001;
  }
  
  destroy(): void {
    this.scene.remove(this.particles);
    this.geometry.dispose();
    this.material.dispose();
  }
}
```

### 烟花特效

```typescript
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
```

### 光效

```typescript
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
```

### 霓虹灯效果

```typescript
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
```

### 材质效果

```typescript
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
```

### 水波纹效果

```typescript
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
```

### 动画效果

```typescript
import { Effect } from './Effect';
import { AnimationMixer, AnimationClip } from 'three';

export class AnimationEffect extends Effect {
  private mixer: AnimationMixer;
  private animations: AnimationClip[] = [];
  
  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
    // 动画初始化逻辑
  }
  
  init(): void {
    this.mixer = new AnimationMixer(this.targetObject);
    this.animations.push(this.mixer.clipAction(this.animationClip));
  }
  
  update(deltaTime: number): void {
    if (!this.enabled) return;
    
    this.mixer.update(deltaTime);
  }
  
  destroy(): void {
    this.animations.forEach(clip => clip.stop());
    this.mixer = null;
  }
}
```

### 流体模拟效果

```typescript
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
```

## 前端界面设计

### 主页 (Home.vue) - 极客风格设计

```vue
<template>
  <div class="cyber-container">
    <header class="cyber-header">
      <h1 class="cyber-title">Three FX Studio</h1>
      <div class="cyber-search">
        <input v-model="searchQuery" placeholder="搜索特效..." class="cyber-input" />
      </div>
    </header>
    
    <div class="cyber-grid" ref="effectsGrid">
      <EffectCard 
        v-for="effect in filteredEffects" 
        :key="effect.id"
        :effect="effect"
        @click="goToDetail(effect)"
        class="cyber-card"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import EffectCard from '@/components/EffectCard.vue';
import { EffectType } from '@/types';

const searchQuery = ref('');
const effectsGrid = ref<HTMLElement | null>(null);
const effects = ref<EffectType[]>([
  { id: 1, name: '粒子烟花', type: 'particle', description: '绚丽的粒子烟花效果' },
  { id: 2, name: '动态光效', type: 'light', description: '流动的动态光效系统' },
  { id: 3, name: '玻璃材质', type: 'material', description: '逼真的玻璃材质效果' },
  { id: 4, name: '水波纹', type: 'material', description: '动态水波纹效果' },
  { id: 5, name: '流体模拟', type: 'animation', description: '逼真的流体动力学模拟' },
  { id: 6, name: '霓虹灯', type: 'light', description: '炫酷的霓虹灯效果' },
  { id: 7, name: '星空', type: 'particle', description: '深邃的星空效果' },
  { id: 8, name: '火焰', type: 'particle', description: '逼真的火焰效果' },
  { id: 9, name: '闪电', type: 'light', description: '震撼的闪电效果' },
  { id: 10, name: '魔法粒子', type: 'particle', description: '神秘的魔法粒子效果' },
  // 更多特效...
]);

const filteredEffects = computed(() => {
  return effects.value.filter(effect => 
    effect.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const goToDetail = (effect: EffectType) => {
  // 路由跳转到详情页
};

onMounted(() => {
  // 滚动动画效果
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('cyber-animate');
      }
    });
  }, { threshold: 0.1 });

  if (effectsGrid.value) {
    const cards = effectsGrid.value.querySelectorAll('.cyber-card');
    cards.forEach(card => observer.observe(card));
  }
});
</script>

<style>
.cyber-container {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%);
  min-height: 100vh;
  color: #fff;
  font-family: 'Courier New', monospace;
  padding: 20px;
}

.cyber-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.cyber-title {
  font-size: 3rem;
  background: linear-gradient(90deg, #00ff88, #00ffff, #ff00ff, #ff0088);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
  margin: 0;
  letter-spacing: 2px;
}

.cyber-search {
  margin-top: 20px;
}

.cyber-input {
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #00ff88;
  color: #fff;
  padding: 12px 20px;
  border-radius: 30px;
  font-size: 1rem;
  width: 300px;
  text-align: center;
  transition: all 0.3s ease;
}

.cyber-input::placeholder {
  color: #00ff88;
}

.cyber-input:focus {
  outline: none;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  transform: scale(1.05);
}

.cyber-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.cyber-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #00ff88;
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  transform: translateY(50px);
  opacity: 0;
}

.cyber-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #00ff88, #00ffff);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.cyber-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
}

.cyber-card:hover::before {
  transform: scaleX(1);
}

.cyber-card.cyber-animate {
  transform: translateY(0);
  opacity: 1;
  transition: all 0.6s ease;
}

.cyber-card:nth-child(even) {
  animation-delay: 0.1s;
}

.cyber-card:nth-child(3n) {
  animation-delay: 0.2s;
}

.cyber-card:nth-child(4n) {
  animation-delay: 0.3s;
}

.effect-preview {
  width: 80px;
  height: 80px;
  margin: 0 auto 15px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.preview-particle {
  background: radial-gradient(circle, #ff6b6b, transparent);
  animation: pulse 2s infinite;
  box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
}

.preview-light {
  background: radial-gradient(circle, #ffd93d, transparent);
  box-shadow: 0 0 30px #ffd93d;
  animation: glow 3s infinite;
}

.preview-material {
  background: linear-gradient(45deg, #6bcf7f, #4d96ff);
  animation: rotate 5s linear infinite;
  box-shadow: 0 0 20px rgba(107, 207, 127, 0.5);
}

.preview-animation {
  background: conic-gradient(from 0deg, #ff6b6b, #ffd93d, #6bcf7f, #4d96ff);
  animation: spin 4s linear infinite;
  box-shadow: 0 0 20px rgba(77, 150, 255, 0.5);
}

.effect-description {
  font-size: 14px;
  color: #00ff88;
  margin-top: 10px;
  text-align: center;
  letter-spacing: 1px;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 30px #ffd93d; }
  50% { box-shadow: 0 0 60px #ffd93d, 0 0 90px #ffd93d; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes cyber-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes cyber-glow {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
}
</style>
```
```

### 特效卡片 (EffectCard.vue) - 极客风格设计

```vue
<template>
  <div class="cyber-card" @click="$emit('click', effect)">
    <div class="cyber-preview" :class="`preview-${effect.type}`"></div>
    <h3 class="cyber-title">{{ effect.name }}</h3>
    <p class="cyber-description">{{ effect.description }}</p>
    <div class="cyber-hack-line"></div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { EffectType } from '@/types';

defineProps({
  effect: {
    type: Object as PropType<EffectType>,
    required: true
  }
});
</script>

<style>
.cyber-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #00ff88;
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  transform: translateY(50px);
  opacity: 0;
}

.cyber-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #00ff88, #00ffff);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.cyber-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
}

.cyber-card:hover::before {
  transform: scaleX(1);
}

.cyber-card.cyber-animate {
  transform: translateY(0);
  opacity: 1;
  transition: all 0.6s ease;
}

.cyber-card:nth-child(even) {
  animation-delay: 0.1s;
}

.cyber-card:nth-child(3n) {
  animation-delay: 0.2s;
}

.cyber-card:nth-child(4n) {
  animation-delay: 0.3s;
}

.cyber-preview {
  width: 80px;
  height: 80px;
  margin: 0 auto 15px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px currentColor;
}

.preview-particle {
  background: radial-gradient(circle, #ff6b6b, transparent);
  animation: pulse 2s infinite;
  box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
}

.preview-light {
  background: radial-gradient(circle, #ffd93d, transparent);
  box-shadow: 0 0 30px #ffd93d;
  animation: glow 3s infinite;
}

.preview-material {
  background: linear-gradient(45deg, #6bcf7f, #4d96ff);
  animation: rotate 5s linear infinite;
  box-shadow: 0 0 20px rgba(107, 207, 127, 0.5);
}

.preview-animation {
  background: conic-gradient(from 0deg, #ff6b6b, #ffd93d, #6bcf7f, #4d96ff);
  animation: spin 4s linear infinite;
  box-shadow: 0 0 20px rgba(77, 150, 255, 0.5);
}

.cyber-title {
  color: #00ffff;
  text-align: center;
  margin: 15px 0 10px;
  font-size: 1.2rem;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.cyber-description {
  color: #00ff88;
  margin-top: 10px;
  text-align: center;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.cyber-hack-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, #00ff88, transparent);
  margin-top: 15px;
  opacity: 0.5;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 30px #ffd93d; }
  50% { box-shadow: 0 0 60px #ffd93d, 0 0 90px #ffd93d; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes cyber-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes cyber-glow {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
}
</style>
```
```

### 星空效果

```typescript
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
```

### 火焰效果

```typescript
import { Effect } from './Effect';
import { BufferGeometry, Float32BufferAttribute, PointsMaterial, Points } from 'three';

export class FireEffect extends Effect {
  private fire: Points;
  private geometry: BufferGeometry;
  private material: PointsMaterial;
  
  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
    this.geometry = new BufferGeometry();
    this.material = new PointsMaterial({
      color: 0xff6600,
      size: 0.3,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    this.fire = new Points(this.geometry, this.material);
    this.scene.add(this.fire);
  }
  
  init(): void {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      
      // 火焰颜色渐变
      const color = new THREE.Color();
      const t = Math.random();
      if (t < 0.5) {
        color.setHSL(0, 1, 0.5 + t); // 橙色到黄色
      } else {
        color.setHSL(0.1, 1, 0.3 + t * 0.3); // 黄色到红色
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    this.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    this.material.vertexColors = true;
  }
  
  update(deltaTime: number): void {
    const positions = this.geometry.attributes.position.array as Float32Array;
    const colors = this.geometry.attributes.color.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      // 火焰上升和扩散
      positions[i + 1] += deltaTime * 2;
      positions[i] += (Math.random() - 0.5) * deltaTime;
      positions[i + 2] += (Math.random() - 0.5) * deltaTime;
      
      // 淡出效果
      if (positions[i + 1] > 10) {
        positions[i] = 0;
        positions[i + 1] = 0;
        positions[i + 2] = 0;
      }
      
      // 颜色变化
      const t = positions[i + 1] / 10;
      const color = new THREE.Color();
      if (t < 0.5) {
        color.setHSL(0, 1, 0.5 + t); // 橙色到黄色
      } else {
        color.setHSL(0.1, 1, 0.3 + t * 0.3); // 黄色到红色
      }
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }
    
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
  }
  
  destroy(): void {
    this.scene.remove(this.fire);
    this.geometry.dispose();
    this.material.dispose();
  }
}
```

### 闪电效果

```typescript
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
```

### 魔法粒子效果

```typescript
import { Effect } from './Effect';
import { BufferGeometry, Float32BufferAttribute, PointsMaterial, Points } from 'three';

export class MagicParticleEffect extends Effect {
  private particles: Points;
  private geometry: BufferGeometry;
  private material: PointsMaterial;
  
  constructor(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    super(scene, camera, renderer);
    this.geometry = new BufferGeometry();
    this.material = new PointsMaterial({
      color: 0x00ff00,
      size: 0.2,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    this.particles = new Points(this.geometry, this.material);
    this.scene.add(this.particles);
  }
  
  init(): void {
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // 魔法颜色
      const color = new THREE.Color();
      color.setHSL(Math.random(), 1, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    this.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    this.material.vertexColors = true;
  }
  
  update(deltaTime: number): void {
    const positions = this.geometry.attributes.position.array as Float32Array;
    const colors = this.geometry.attributes.color.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      // 魔法粒子运动
      positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.01;
      positions[i + 1] += Math.cos(Date.now() * 0.001 + i) * 0.01;
      positions[i + 2] += Math.sin(Date.now() * 0.002 + i) * 0.01;
      
      // 颜色变化
      const color = new THREE.Color();
      color.setHSL(
        (Date.now() * 0.0001 + i * 0.001) % 1,
        1,
        0.5
      );
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }
    
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
  }
  
  destroy(): void {
    this.scene.remove(this.particles);
    this.geometry.dispose();
    this.material.dispose();
  }
}
```

## 开发配置

### package.json

```json
{
  "name": "three-fx-studio",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "three": "^0.160.0",
    "vue": "^3.3.0",
    "vue-router": "^4.2.0"
  },
  "devDependencies": {
    "@types/three": "^0.160.0",
    "@vitejs/plugin-vue": "^4.2.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0"
  },
  "packageManager": "pnpm@8.0.0"
}
```

### pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
  - 'examples/*'
```

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000
  }
});
```

## 使用方式

```bash
# 安装 pnpm（如果尚未安装）
npm install -g pnpm

# 初始化项目
pnpm init

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build
```

## 优势说明

1. **pnpm 优势**:
   - 更快的安装速度
   - 更高效的磁盘空间利用
   - 严格的依赖树管理

2. **直接导入优势**:
   - 更清晰的代码结构
   - 避免全局命名空间污染
   - 更好的 Tree Shaking 支持

3. **模块化设计**:
   - 每个特效独立模块
   - 统一接口设计
   - 易于扩展和维护

## 后续计划

1. 实现具体的特效类
2. 开发前端界面
3. 添加路由和状态管理
4. 优化性能和用户体验

---

设计文档已创建并提交。请审查此文档，如果您有任何修改建议，请告诉我，然后我们将进入实现阶段。