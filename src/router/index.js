import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import wallet from '@/components/wallet.vue'
import login from '@/components/login.vue'
import signup from '@/components/signup.vue'
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
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  // {
  //   path: '/main',
  //   name: 'main',
  //   component: App
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router