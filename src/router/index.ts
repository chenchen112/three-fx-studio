import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/effect/:id',
    name: 'EffectDetail',
    component: () => import('../views/EffectDetail.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;