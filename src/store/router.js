const state = () => ({
  fromRoute: null,
})

const getters = {
  fromRoute: (state) => {
    return state.fromRoute
  },
}

const mutations = {
  setFromRoute(state, payload) {
    console.log(payload)
    state.fromRoute = payload
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
