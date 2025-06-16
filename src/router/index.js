import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '@/views/SignUp.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useCounterStore } from '@/stores/counter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true } // This route requires authentication
    }
  ],
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const counterStore = useCounterStore()
  if (to.meta.requiresAuth && !counterStore.isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
