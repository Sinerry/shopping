import axios from 'axios'
import Vue from 'vue'
import { Message } from 'element-ui'
import router from '@/router/'
const http = axios.create({
  baseURL: '/api/private/v1',
  timeout: 5000
})

// 请求拦截器
http.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.common.Authorization = token
  }
  return config
}, e => {
  return Promise.reject(e)
})
// 响应拦截器
http.interceptors.response.use(response => {
  const { data, meta } = response.data
  if (meta.status === 200) {
    return data
  }
  Message.error('[获取数据失败] , 请稍后重试')
  return router.push('/', {
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}, e => {
  return Promise.reject(e)
})

Vue.prototype.$http = http

export default http
