import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Homepage from "@/views/components/HomePage.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path : "/",
    component : Homepage,
    name : "HomePage"
  },
  {
    path : "/user",
    component : Homepage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
