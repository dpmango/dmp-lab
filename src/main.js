import "core-js/stable"
import { createApp } from "vue"
import App from "./App.vue"
import router from "@/config/router"
import store from "@/store"
import initPlugins from "@/plugins"
import * as components from "@/components"

const app = createApp(App).use(store).use(router)

initPlugins(app)

for (const name in components) {
  app.component(name, components[name])
}

app.mount("#app")
