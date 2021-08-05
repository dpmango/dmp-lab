import Toast, { POSITION } from "vue-toastification"
import "vue-toastification/dist/index.css"

const toastification = (app) => {
  app.use(Toast, { position: POSITION.TOP_RIGHT })
}

export default toastification
