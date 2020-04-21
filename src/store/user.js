import { login } from '@/service/user'
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
    const { data, meta } = await login(formModel)
    if (meta.status === 200) {
      const { token, ...userInfo } = data
      commit('setToken', token)
      commit('setUserInfo', userInfo)
      return token
    }
    return null
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
