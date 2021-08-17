import { loginService, userService, passwordChangeService, updateUserService } from "@/api/auth"

const state = () => ({
  user: {
    firstName: null,
    lastName: null,
    balance: 0,
  },
})

const getters = {
  user: (state) => {
    return state.user
  },
  isAuthenticated: (state) => {
    // return !!state.token
    return state.user.firstName !== null
  },
}

const mutations = {
  logOut(state) {
    state.user = {
      firstName: null,
      lastName: null,
      balance: 0,
    }
  },
  updateUser(state, user) {
    state.user = { ...state.user, ...user }
  },
}

const actions = {
  async login({ commit, dispatch }, request) {
    const [err, result] = await loginService(request)

    if (err) throw err

    const user = await dispatch("getUser")

    return user
  },
  async getUser({ commit }) {
    const [err, result] = await userService()

    if (err) throw err

    const { success, response } = result

    commit("updateUser", response)

    return response
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
