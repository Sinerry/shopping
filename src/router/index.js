import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import User from '@/pages/User'
import Welcome from '@/pages/Welcome'
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/login',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/users',
        name: 'users',
        component: User
      }
    ]
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
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    if (!token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
