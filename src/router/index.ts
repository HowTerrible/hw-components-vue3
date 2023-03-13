import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { componentsRouteConfig } from '../views/demos/demoConfig'

const homeRoute =
{
  path: '/',
  name: 'home',
  component: () => import('../views/HomeView.vue'),
  children: []
}

componentsRouteConfig.forEach(config => {
  homeRoute.children.push(config)
})

const routes: Array<RouteRecordRaw> = [
  homeRoute,
  {
    path: "/:catchAll(.*)",
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
