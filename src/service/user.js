import http from '@/middleware/http'
const login = async formModel => {
  return await http.post('/login', formModel)
}

export { login }
