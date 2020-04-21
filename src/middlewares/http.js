import axios from 'axios'
import Vue from 'vue'
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
  return response.data
}, e => {
  return Promise.reject(e)
})

Vue.prototype.$http = http

export default http
