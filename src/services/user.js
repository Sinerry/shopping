import http from '@/middlewares/http'
const login = async formModel => {
  return await http.post('/login', formModel)
}

export { login }
