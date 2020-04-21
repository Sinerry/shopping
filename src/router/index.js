import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const token = window.localStorage.getItem('token')
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    if (!token) {
      next()
    } else {
      next(from.path)
    }
  }
  if (to.path === '/') {
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
