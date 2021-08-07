import { createStore } from "vuex"
import ui from "./ui"
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
    ui,
    auth,
    router,
    ads,
  },
})
