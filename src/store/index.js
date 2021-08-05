import { createStore } from "vuex"
import auth from "./auth"
import router from "./router"
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
    router,
    ads,
  },
})
