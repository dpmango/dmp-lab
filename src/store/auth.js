import {
  loginService,
  logoutService,
  refreshTokenService,
  passwordChangeService,
  updateUserService,
} from "@/api/auth"

const state = () => ({
  token: null,
  user: {
    email: null,
  },
})

const getters = {
  user: (state) => {
    return state.user
  },
  token: (state) => {
    return state.token
  },
  isAuthenticated: (state) => {
    return !!state.token
  },
}

const mutations = {
  logOut(state) {
    state.token = null
    state.user = {
      email: null,
    }

    localStorage.removeItem("auth_token")
  },
  updateToken(state, token) {
    if (token) {
      state.token = token

      localStorage.setItem("auth_token", token)
    }
  },
  updateUser(state, user) {
    state.user = { ...state.user, ...user }
  },
}

const actions = {
  checkToken({ commit }) {
    const token = localStorage.getItem("auth_token", null)

    if (token) {
      commit("updateToken", token)
    }
  },
  async login({ commit }, request) {
    const [err, result] = await loginService(request)

    if (err) throw err

    const { token, user } = result

    commit("updateToken", token)
    commit("updateUser", user)

    return result
  },
  async logout({ commit, dispatch }) {
    // const [err, result] = await logoutService()

    // if (err) throw err

    commit("logOut")

    // dispatch("chat/disconnect", null, { root: true })
    // commit("chat/resetMessages", null, { root: true })

    // this.$router.push("/")

    // return result
  },
  async refreshToken({ commit }, request) {
    const [err, result] = await refreshTokenService(request)

    if (err);

    const { token } = result

    commit("updateToken", token)

    return result
  },
  async passwordChange({ commit, _dispatch }, request) {
    const [err, result] = await passwordChangeService(request)

    if (err) throw err

    // const { detail } = result

    return result
  },
  async update({ commit }, request) {
    const [err, result] = await updateUserService(request)

    if (err) throw err

    commit("updateUser", result)

    return result
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
