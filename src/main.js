import "core-js/stable"
import { createApp } from "vue"
import App from "./App.vue"
import router from "@/config/router"
import store from "@/store"
import * as components from "@/components"

const app = createApp(App).use(store).use(router)

for (const name in components) {
  app.component(name, components[name])
}

app.mount("#app")
