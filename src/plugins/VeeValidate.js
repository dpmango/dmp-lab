import { defineRule, configure, Form, Field } from "vee-validate"
import { required, email, alpha, confirmed, min, max } from "@vee-validate/rules"

const veeValidate = (app) => {
  // defineRule("required", { ...required, message: "Это поле не может быть пустым" })
  // defineRule("email", { ...email, message: "Неверный формат E-mail" })
  // defineRule("alpha", { ...alpha, message: "Поле должно содержать только буквы" })
  // defineRule("confirmed", { ...confirmed, message: "Пароли не совпадают" })
  // defineRule("min", { ...min, message: "Минимум {length} символов" })
  // defineRule("max", { ...max, message: "Максимум {length} символов" })

  configure({
    bails: false,
  })

  defineRule("required", required)
  defineRule("email", email)
  defineRule("alpha", alpha)
  defineRule("confirmed", confirmed)
  defineRule("min", min)
  defineRule("max", max)

  defineRule("tel", (value) => {
    if (!value) return false
    const reg = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/
    return value.match(reg) ? true : "Введите номер телефона"
  })

  app.component("Form", Form)
  app.component("Field", Field)

  // setInteractionMode("passive")
}

export default veeValidate
