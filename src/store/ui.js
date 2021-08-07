const state = () => ({
  sidebarOpened: false,
})

const getters = {}

const mutations = {
  setSidebar(state, payload) {
    state.sidebarOpened = payload
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
