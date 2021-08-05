import legacy from "./Legacy"
import { initAxios } from "./Axios"
import veeValidate from "./VeeValidate"
import toastification from "./Toastification"
import datepicker from "./Datepicker"
import clickOutside from "./ClickOutside"

const initPlugins = (app) => {
  legacy(app)
  initAxios(app)
  veeValidate(app)
  toastification(app)
  datepicker(app)
  clickOutside(app)
}

export default initPlugins
