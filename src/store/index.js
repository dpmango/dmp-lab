import { createStore } from "vuex"
import auth from "./auth"

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
  },
})
