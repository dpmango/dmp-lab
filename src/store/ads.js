// import { loginService } from "@/api/auth"
import {
  getCompaignService,
  createCompaignService,
  stopCompaignService,
  getGroupAd,
  getAds,
} from "@/api/ads"

const state = () => ({
  compaings: {
    list: [],
    pagination: {},
  },
  groupAds: {
    list: [],
    pagination: {},
  },
  ads: {
    list: [],
    pagination: {},
  },
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
  compaings: (state) => {
    return state.compaings.list
  },
  compaingsPagination: (state) => {
    return state.compaings.pagination
  },
  groupAds: (state) => {
    return state.groupAds.list
  },
  groupAdsPagination: (state) => {
    return state.groupAds.pagination
  },
  ads: (state) => {
    return state.ads.list
  },
  adsPagination: (state) => {
    return state.ads.pagination
  },
}

const mapList = (x) => {
  return {
    id: x.campaignId,
    active: x.statusEnabled,
    list: [
      {
        type: "string",
        content: x.name,
      },
      {
        type: "date",
        content: x.createdAt,
      },
      {
        type: "status",
        content: x.statusModerator,
      },

      {
        type: "number",
        content: x.dayLimit,
      },
      {
        type: "number",
        content: x.impressions,
      },
      {
        type: "number",
        content: x.clicks,
      },
      {
        type: "number",
        content: x.ctr,
      },
      {
        type: "number",
        content: x.cpc,
      },
      {
        type: "number",
        content: x.cpm,
      },
    ],
  }
}

const mutations = {
  setCompaings(state, req) {
    const compaings = {
      pagination: req.pagination,
      list: req.campaigns.map((x) => mapList(x)),
    }

    state.compaings = { ...compaings }
  },
  setGroupAds(state, req) {
    const groupAds = {
      pagination: req.pagination,
      list: req.groups.map((x) => mapList(x)),
    }

    state.groupAds = { ...groupAds }
  },
  setAds(state, req) {
    const ads = {
      pagination: req.pagination,
      list: req.ads.map((x) => mapList(x)),
    }

    state.ads = { ...ads }
  },

  setFilterView(state, payload) {
    state.filterView = payload
  },
  setFilterDate(state, payload) {
    state.filterDate = payload
  },
}

const actions = {
  async getCompaings({ commit }, request) {
    const [err, result] = await getCompaignService(request)

    if (err) throw err

    const { success, response } = result

    commit("setCompaings", response)

    return response
  },
  async createCompaign({ commit }, request) {
    const [err, result] = await createCompaignService(request)

    if (err) throw err

    const { success, response } = result

    commit("setCompaings", response)

    return response
  },
  async stopCompaigns({ commit }, request) {
    const [err, result] = await stopCompaignService(request)

    if (err) throw err

    const { success, response } = result

    console.log(result, response)
    // commit("setCompaings", response)

    return response
  },
  async getGroupAds({ commit }, request) {
    const [err, result] = await getGroupAd(request)

    if (err) throw err

    const { success, response } = result

    commit("setGroupAds", response)

    return response
  },
  async getAds({ commit }, request) {
    const [err, result] = await getAds(request)

    if (err) throw err

    const { success, response } = result

    commit("setAds", response)

    return response
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
