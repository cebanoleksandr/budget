import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {auth: true},
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: {auth: true},
      component: () => import('../views/Categories.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {auth: true},
      component: () => import('../views/DetailRecord.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: {auth: true},
      component: () => import('../views/History.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: {auth: true},
      component: () => import('../views/Planning.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {auth: true},
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: {auth: true},
      component: () => import('../views/Record.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
