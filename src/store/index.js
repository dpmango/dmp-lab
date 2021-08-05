import { createStore } from "vuex"
import auth from "./auth"
import ads from "./ads"

export default createStore({
  // state: {},
  // mutations: {},
  actions: {
    init({ dispatch }) {
      dispatch("auth/checkToken", { root: true })
    },
  },
  modules: {
    auth,
    ads,
  },
})
