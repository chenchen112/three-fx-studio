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
            <span class="cyber-value">{{ effectManager.getFPS() }}</span>
          </div>
          <div class="cyber-stat">
            <span class="cyber-label">Particles:</span>
            <span class="cyber-value">{{ particleCount }}</span>
          </div>
        </div>
      </div>

      <div class="cyber-buttons">
        <el-button
          type="primary"
          :icon="isPlaying ? VideoPause : VideoPlay"
          @click="toggleAnimation"
        >
          {{ isPlaying ? '暂停' : '播放' }}
        </el-button>
        <el-button
          type="primary"
          :icon="Refresh"
          @click="resetEffect"
        >
          重置
        </el-button>
        <el-button
          type="primary"
          :icon="FullScreen"
          @click="toggleFullscreen"
        >
          全屏
        </el-button>
      </div>

      <div class="cyber-effect-selector">
        <h3 class="cyber-selector-title">选择特效</h3>
        <div class="cyber-effect-list">
          <el-button
            v-for="type in effectTypes"
            :key="type"
            :type="selectedEffectType === type ? 'primary' : 'default'"
            @click="selectedEffectType = type; createEffect()"
          >
            {{ type }}
          </el-button>
        </div>
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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { EffectManager } from '@/effects/EffectManager';
import { VideoPause, VideoPlay, Refresh, FullScreen } from '@element-plus/icons-vue';
import { ElButton } from 'element-plus';

const effectDisplay = ref<HTMLElement | null>(null);
const effectName = ref('特效名称');
const effectDescription = ref('特效描述');
const isPlaying = ref(true);
const fps = ref(60);
const particleCount = ref(0);
const showOverlay = ref(true);
const effectManager = new EffectManager();

// 特效类型列表
const effectTypes = computed(() => effectManager.getEffectTypes());

// 当前选中的特效类型
const selectedEffectType = ref('particle');

// 创建特效
const createEffect = () => {
  const effect = effectManager.createEffect(selectedEffectType.value);
  if (effect) {
    effectName.value = selectedEffectType.value;
    effectDescription.value = `这是一个${selectedEffectType.value}特效`;
  }
};

// 初始化时创建默认特效
onMounted(() => {
  createEffect();
});

const toggleAnimation = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    effectManager.startEffect();
  } else {
    effectManager.stopEffect();
  }
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

// 动画循环
let animationId: number | null = null;
const animate = () => {
  if (isPlaying.value) {
    effectManager.updateEffect(16); // 假设 60fps
    animationId = requestAnimationFrame(animate);
  }
};

onMounted(() => {
  // 添加渲染器到 DOM
  if (effectDisplay.value) {
    effectDisplay.value.appendChild(effectManager.getRenderer().domElement);
  }

  // 启动动画
  animate();

  // 3秒后隐藏覆盖层
  setTimeout(() => {
    showOverlay.value = false;
  }, 3000);
});

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  effectManager.dispose();
});
</script>

<style>
.cyber-fullscreen {
  width: 100vw;
  height: 100vh;
  background: radial-gradient(ellipse at center, #f5f5f5 0%, #e0e0e0 100%);
  position: relative;
}

.cyber-effect-display {
  width: 100%;
  height: 100%;
  position: relative;
  touch-action: none;
}

.cyber-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.9), transparent);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  pointer-events: none;
}

.cyber-controls > * {
  pointer-events: auto;
}

.cyber-hud {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cyber-info {
  color: #8e8e8e;
}

.cyber-title {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 200;
}

.cyber-subtitle {
  font-size: 0.9rem;
  margin: 5px 0 0;
  color: #666;
}

.cyber-stats {
  display: flex;
  gap: 20px;
}

.cyber-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cyber-label {
  font-size: 0.7rem;
  color: #999;
}

.cyber-value {
  font-size: 1rem;
  color: #333;
  font-weight: bold;
}

.cyber-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.el-button {
  background: #f5f5f5;
  border-color: #d0d0d0;
  color: #666;
  font-size: 0.9rem;
}

.el-button:hover {
  background: #e0e0e0;
  border-color: #b0b0b0;
  color: #333;
}

.el-button--primary {
  background: #8e8e8e;
  border-color: #8e8e8e;
  color: #fff;
}

.el-button--primary:hover {
  background: #7a7a7a;
  border-color: #7a7a7a;
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

.cyber-effect-selector {
  margin-top: 20px;
}

.cyber-selector-title {
  color: #8e8e8e;
  font-size: 1rem;
  margin-bottom: 10px;
  text-align: center;
}

.cyber-effect-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
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