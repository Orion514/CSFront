import { loginApi, getInfoApi, loginOutApi } from '@/api/user'

const state = () => ({
  token: '', // 登录token
  info: {},  // 用户信息
})

// getters
const getters = {
  token(state) {
    return state.token
  },
  info(state) {
    return state.info
  }
}

// mutations
const mutations = {
  tokenChange(state, token) {
    state.token = token
  },
  infoChange(state, info) {
    state.info = info
  }
}

// actions
const actions = {
  // login by login.vue
  login({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      console.log(params)
      loginApi(params)
      .then(res => {
        console.log(res)
        commit('tokenChange', res.data.token)
        dispatch('getInfo', { token: res.data.token })
        .then(infoRes => {
          resolve(res.data.token)
        })
      })
    })
  },
  // get user info after user logined
  getInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      console.log(params)
      getInfoApi(params)
      .then(res => {
        commit('infoChange', res.data)
        console.log(res.data)
        resolve(res.data.info)
      })
    })
  },

  // login out the system after user click the loginOut button
  loginOut({ commit }) {
    loginOutApi()
    .then(res => {

    })
    .catch(error => {

    })
    .finally(() => {
      localStorage.removeItem('tabs')
      localStorage.removeItem('vuex')
      location.reload()
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
