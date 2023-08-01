import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
  ]
})

const specialRoutes = ['login', 'register']

import { useCurrentUserStore } from '../stores/CurrentUser.js'

router.beforeEach(async (to, _from) => {
  const { isAuthenticated } = useCurrentUserStore()

  if (specialRoutes.includes(to.name) && (await isAuthenticated())) {
    return { name: 'home' }
  } 
})

export default router
