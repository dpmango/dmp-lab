import { createStore } from "vuex"
import ui from "./ui"
import router from "./router"
import auth from "./auth"
import ads from "./ads"
import support from "./support"

export default createStore({
  // state: {},
  // mutations: {},
  actions: {
    async init({ dispatch }) {
      await dispatch("auth/getUser", { root: true })
    },
  },
  modules: {
    ui,
    router,
    auth,
    ads,
    support,
  },
})
