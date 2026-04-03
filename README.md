# Three FX Studio

一个基于 three.js 实现的三维特效库，提供多种炫酷的 3D 特效展示。

## 特性

- 🎨 **10+ 种炫酷特效**：粒子烟花、动态光效、玻璃材质、水波纹、流体模拟、霓虹灯、星空、火焰、闪电、魔法粒子等
- 🚀 **高性能渲染**：优化的 Three.js 渲染，支持 60fps 动画
- 🎮 **交互控制**：鼠标控制视角，滚轮缩放，全屏模式
- 🎨 **极客风格 UI**：霓虹效果、滚动动画、黑客风格设计
- 📱 **响应式设计**：自适应不同屏幕尺寸

## 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite
- **编程语言**: TypeScript
- **三维引擎**: Three.js
- **包管理器**: pnpm

## 安装

```bash
# 安装 pnpm（如果尚未安装）
npm install -g pnpm

# 克隆项目
git clone https://github.com/yourusername/three-fx-studio.git

# 进入项目目录
cd three-fx-studio

# 安装依赖
pnpm install
```

## 运行

```bash
# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build

# 预览生产版本
pnpm run preview
```

## 使用

### 基本使用

```typescript
import { EffectManager } from './effects/EffectManager';

// 创建特效管理器
const effectManager = new EffectManager();

// 选择特效类型
const effectType = 'particle'; // 可选: particle, fireworks, light, neon, material, water, fluid, starfield, fire, lightning, magic

// 创建特效
const effect = effectManager.createEffect(effectType);

// 启动动画
effectManager.startEffect();

// 停止动画
effectManager.stopEffect();
```

### 在 Vue 组件中使用

```vue
<template>
  <FullscreenView />
</template>

<script setup lang="ts">
import FullscreenView from '@/components/FullscreenView.vue';
</script>
```

## 特效类型

### 粒子特效 (Particle)

- **粒子烟花 (Fireworks)**: 绚丽的粒子烟花爆炸效果
- **星空 (StarField)**: 深邃的星空效果
- **火焰 (Fire)**: 逼真的火焰效果
- **魔法粒子 (Magic)**: 神秘的魔法粒子效果

### 光效 (Light)

- **动态光效 (Light)**: 流动的动态光效系统
- **霓虹灯 (Neon)**: 炫酷的霓虹灯效果
- **闪电 (Lightning)**: 震撼的闪电效果

### 材质效果 (Material)

- **玻璃材质 (Material)**: 逼真的玻璃材质效果
- **水波纹 (WaterRipple)**: 动态水波纹效果

### 动画效果 (Animation)

- **流体模拟 (FluidSimulation)**: 逼真的流体动力学模拟

## 开发

### 项目结构

```
three-fx-studio/
├── src/
│   ├── components/         # Vue 组件
│   │   ├── EffectCard.vue   # 特效卡片组件
│   │   └── FullscreenView.vue # 全屏视图组件
│   ├── effects/           # 特效实现
│   │   ├── Effect.ts      # 特效基类
│   │   ├── ParticleEffect.ts # 粒子特效
│   │   ├── FireworksEffect.ts # 烟花特效
│   │   ├── LightEffect.ts  # 光效
│   │   ├── NeonEffect.ts   # 霓虹灯效果
│   │   ├── MaterialEffect.ts # 材质效果
│   │   ├── WaterRippleEffect.ts # 水波纹效果
│   │   ├── FluidSimulationEffect.ts # 流体模拟效果
│   │   ├── StarFieldEffect.ts # 星空效果
│   │   ├── FireEffect.ts   # 火焰效果
│   │   ├── LightningEffect.ts # 闪电效果
│   │   └── MagicParticleEffect.ts # 魔法粒子效果
│   │   └── EffectManager.ts # 特效管理器
│   ├── views/             # 页面视图
│   │   ├── Home.vue       # 主页
│   │   └── EffectDetail.vue # 特效详情页
│   ├── assets/            # 资源文件
│   │   └── styles/        # 样式文件
│   ├── types.ts           # 类型定义
│   ├── App.vue            # 根组件
│   ├── main.ts            # 入口文件
│   └── router/            # 路由配置
│       └── index.ts
├── package.json
├── vite.config.ts         # Vite 配置
└── tsconfig.json          # TypeScript 配置
```

### 添加新特效

1. 创建新的特效类，继承 `Effect` 基类
2. 在 `EffectManager` 中注册新特效
3. 在 `Home.vue` 中添加特效描述

```typescript
// 新特效示例
import { Effect } from './Effect';
import { Mesh, SphereGeometry, MeshBasicMaterial } from 'three';

export class NewEffect extends Effect {
  private mesh: Mesh;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    super(scene, camera, renderer);
    this.mesh = new Mesh(
      new SphereGeometry(1, 32, 32),
      new MeshBasicMaterial({ color: 0xff0000 })
    );
    this.scene.add(this.mesh);
  }

  init(): void {}

  update(deltaTime: number): void {
    this.mesh.rotation.x += deltaTime * 0.5;
    this.mesh.rotation.y += deltaTime * 0.3;
  }

  destroy(): void {
    this.scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 联系方式

- GitHub: [yourusername](https://github.com/yourusername)
- Email: your.email@example.com