import legacy from "./Legacy"
import { initAxios } from "./Axios"
import veeValidate from "./VeeValidate"
import clickOutside from "./ClickOutside"

const initPlugins = (app) => {
  legacy(app)
  initAxios(app)
  veeValidate(app)
  clickOutside(app)
}

export default initPlugins
