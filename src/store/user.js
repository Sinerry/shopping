import { login } from '@/services/user'
const state = {
  token: '',
  userInfo: {}
}
const mutations = {
  setToken: (state, token) => {
    state.token = token
  },
  setUserInfo: (state, userInfo) => {
    state.userInfo = userInfo
  }
}
const actions = {
  login: async ({ commit }, formModel) => {
    const data = await login(formModel)
    const { token, ...userInfo } = data
    commit('setToken', token)
    commit('setUserInfo', userInfo)
    return token
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
