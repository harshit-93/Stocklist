import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Wallet from '@/components/Wallet.vue'

const routes = [
  {
    path: '/',
    name: 'Helloworld',
    component: HelloWorld
  },
  {
    path: '/Wallet',
    name: 'Wallet',
    component: Wallet
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router