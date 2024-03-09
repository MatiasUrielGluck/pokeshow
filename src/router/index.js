import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllView from '../views/AllView.vue'
import FavView from '@/views/FavView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/all',
      name: 'all',
      component: AllView
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavView
    }
  ],
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  }
})

export default router
