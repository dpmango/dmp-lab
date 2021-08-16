import { supportTicketService } from "@/api/support"

const state = () => ({})

const getters = {}

const mutations = {}

const actions = {
  async postTicket({ commit, _dispatch }, request) {
    const [err, result] = await supportTicketService(request)

    if (err) throw err

    // const { detail } = result

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
