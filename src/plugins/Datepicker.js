import { SetupCalendar, DatePicker } from "v-calendar"

const datepicker = (app) => {
  app.use(SetupCalendar, {})
  app.component("DatePicker", DatePicker)
}

export default datepicker
