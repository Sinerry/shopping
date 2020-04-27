import http from '@/middlewares/http'

/**
 * 登录
 * @param {object} formModel
 */
const login = async formModel => {
  return await http.post('/login', formModel)
}
/**
 * 获取用户列表
 * @param {object} query
 */
const getUserList = async params => {
  return await http.get('/users', { params })
}

/**
 * toggle用户的状态
 * @param {number} userId
 * @param {boolean} state
 */
const toggleUserState = async (userId, state) => {
  return await http.put(`/users/${userId}/state/${state}`)
}

export { login, getUserList, toggleUserState }
