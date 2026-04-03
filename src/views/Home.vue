<template>
  <div class="cyber-container">
    <el-header class="cyber-header">
      <h1 class="cyber-title">Three FX Studio</h1>
      <div class="cyber-search">
        <el-input
          v-model="searchQuery"
          placeholder="搜索特效..."
          class="cyber-input"
          prefix-icon="Search"
        />
      </div>
    </el-header>

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
import router from '@/router';
import { ElInput } from 'element-plus';

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
]);

const filteredEffects = computed(() => {
  return effects.value.filter(effect =>
    effect.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const goToDetail = (effect: EffectType) => {
  router.push(`/effect/${effect.id}`);
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
  background: #f5f5f5;
  min-height: 100vh;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.cyber-header {
  text-align: center;
  padding: 40px 20px 30px;
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid #e0e0e0;
}

.cyber-title {
  font-size: 2.5rem;
  color: #8e8e8e;
  margin: 0 0 20px 0;
  letter-spacing: -1px;
  font-weight: 200;
}

.cyber-search {
  margin-top: 20px;
}

.cyber-input {
  --el-input-bg-color: #f8f8f8;
  --el-input-border-color: #e0e0e0;
  --el-input-text-color: #666;
  --el-input-placeholder-color: #999;
  --el-input-focus-border-color: #d0d0d0;
  border-radius: 20px;
  font-size: 1rem;
  max-width: 400px;
  width: 90%;
}

.cyber-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #d0d0d0 transparent;
}

.cyber-grid::-webkit-scrollbar {
  width: 8px;
}

.cyber-grid::-webkit-scrollbar-track {
  background: transparent;
}

.cyber-grid::-webkit-scrollbar-thumb {
  background: #d0d0d0;
  border-radius: 4px;
}

.cyber-grid::-webkit-scrollbar-thumb:hover {
  background: #b0b0b0;
}

.cyber-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: visible;
  transform: translateY(30px);
  opacity: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.cyber-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #b8b8b8;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.cyber-card:hover {
  transform: translateY(-4px);
  border-color: #d0d0d0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.cyber-card:hover::before {
  transform: scaleX(1);
}

.cyber-card.cyber-animate {
  transform: translateY(0);
  opacity: 1;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cyber-card:nth-child(1) { transition-delay: 0.1s; }
.cyber-card:nth-child(2) { transition-delay: 0.2s; }
.cyber-card:nth-child(3) { transition-delay: 0.3s; }
.cyber-card:nth-child(4) { transition-delay: 0.4s; }
.cyber-card:nth-child(5) { transition-delay: 0.5s; }
.cyber-card:nth-child(6) { transition-delay: 0.6s; }

.effect-preview {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

.preview-particle {
  background: #e8e8e8;
  animation: pulse-particle 3s ease-in-out infinite;
}

.preview-light {
  background: #f0f0f0;
  animation: glow-light 4s ease-in-out infinite;
}

.preview-material {
  background: #e8e8e8;
  animation: rotate-material 6s linear infinite;
}

.preview-animation {
  background: #f0f0f0;
  animation: spin-animation 8s linear infinite;
}

@keyframes pulse-particle {
  0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(131, 56, 236, 0.5); }
  50% { transform: scale(1.1); box-shadow: 0 0 50px rgba(131, 56, 236, 0.8); }
}

@keyframes glow-light {
  0%, 100% { box-shadow: 0 0 40px rgba(255, 214, 10, 0.4); }
  50% { box-shadow: 0 0 80px rgba(255, 214, 10, 0.8), 0 0 120px rgba(0, 53, 102, 0.4); }
}

@keyframes rotate-material {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-animation {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.effect-description {
  font-size: 14px;
  color: #999;
  margin-top: 12px;
  text-align: center;
  letter-spacing: 0.2px;
  line-height: 1.5;
}

/* 简约的背景 */
.cyber-container {
  background: #f5f5f5;
}
</style>