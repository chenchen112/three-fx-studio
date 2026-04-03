<template>
  <el-card
    class="cyber-card"
    shadow="hover"
    :body-style="{ padding: '20px' }"
    @click="$emit('click', effect)"
  >
    <div class="cyber-preview" :class="`preview-${effect.type}`"></div>
    <h3 class="cyber-title">{{ effect.name }}</h3>
    <p class="cyber-description">{{ effect.description }}</p>
    <div class="cyber-hack-line"></div>
  </el-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { EffectType } from '@/types';
import { ElCard } from 'element-plus';

defineProps({
  effect: {
    type: Object as PropType<EffectType>,
    required: true
  }
});
</script>

<style>
.el-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: visible;
  transform: translateY(30px);
  opacity: 0;
}

.el-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.cyber-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.cyber-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.cyber-card:hover {
  transform: translateY(-10px);
  border-color: rgba(102, 126, 234, 0.3);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
}

.cyber-card:hover::before {
  transform: scaleX(1);
}

.cyber-card:hover::after {
  opacity: 1;
}

.cyber-card.cyber-animate {
  transform: translateY(0);
  opacity: 1;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cyber-preview {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

.preview-particle {
  background: radial-gradient(circle at 30% 30%, #ff006e, #8338ec, #3a86ff);
  animation: pulse-particle 3s ease-in-out infinite;
}

.preview-light {
  background: radial-gradient(circle at 50% 50%, #ffd60a, #003566);
  animation: glow-light 4s ease-in-out infinite;
}

.preview-material {
  background: linear-gradient(135deg, #06ffa5, #0096c7, #7209b7);
  animation: rotate-material 6s linear infinite;
}

.preview-animation {
  background: conic-gradient(from 180deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ff006e);
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

.cyber-title {
  color: #fff;
  text-align: center;
  margin: 20px 0 15px;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.cyber-description {
  color: rgba(255, 255, 255, 0.7);
  margin-top: 15px;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.6;
  letter-spacing: 0.3px;
}

.cyber-hack-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent);
  margin-top: 20px;
  opacity: 0.6;
}
</style>