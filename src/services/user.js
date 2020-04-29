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
/**
 * 添加用户
 * @param {object} formModel
 */
const addUser = async formModel => {
  return await http.post('/users', formModel)
}
/**
 * 获取角色列表
 */
const getRoleList = async () => {
  return await http.get('/roles')
}

/**
 * 获取用户详情
 * @param {number} userId
 */
const getUserById = async userId => {
  return await http.get(`/users/${userId}`)
}

/**
 * 更新用户
 * @param {number} userId
 */
const updateUser = async (userId, params) => {
  return await http.put(`/users/${userId}`, params)
}
/**
 * 删除用户
 * @param {number} userId
 */
const delUserById = async userId => {
  return await http.delete(`/users/${userId}`)
}

export {
  login,
  getUserList,
  toggleUserState,
  addUser,
  getRoleList,
  getUserById,
  updateUser,
  delUserById
}
