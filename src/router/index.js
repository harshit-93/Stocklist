import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import wallet from '@/components/wallet.vue'

const routes = [
  {
    path: '/',
    name: 'Helloworld',
    component: HelloWorld
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: wallet
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router