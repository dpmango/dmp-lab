// import { loginService } from "@/api/auth"

const state = () => ({
  filterView: "list",
  filterDate: {
    start: new Date(),
    end: new Date(),
  },
})

const getters = {
  filterView: (state) => {
    return state.filterView
  },
  filterDate: (state) => {
    return state.filterDate
  },
}

const mutations = {
  setFilterView(state, payload) {
    state.filterView = payload
  },
  setFilterDate(state, payload) {
    state.filterDate = payload
  },
}

const actions = {
  // async login({ commit }, request) {
  //   const [err, result] = await loginService(request)
  //   if (err) throw err
  //   const { token, user } = result
  //   commit("updateToken", token)
  //   commit("updateUser", user)
  //   return result
  // },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
