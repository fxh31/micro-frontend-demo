// src > routers > index.js
import { createWebHashHistory, createRouter, createWebHistory } from "vue-router"

const Home = () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
const Detail = () => import(/* webpackChunkName: "detail" */ '@/views/detail/index.vue')

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/detail',
    component: Detail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
