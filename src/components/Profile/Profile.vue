<template>
  <div class="profile">
    <UiBreadcrumbs :list="crumbs" />

    <Form ref="form" as="form" class="profile__content" @submit="handleSubmit">
      <div class="row">
        <div class="col col-8 col-sm-12">
          <div class="panel">
            <h3 class="panel__title h3-title">Персональные данные</h3>
            <div class="panel__section">
              <UiError :error="error" />

              <div class="row">
                <div class="col col-6 col-mb-12">
                  <Field v-model="name" name="name" v-slot="{ errorMessage, field }">
                    <UiInput theme="dynamic" label="ФИО" :error="errorMessage" v-bind="field" />
                  </Field>
                </div>
                <div class="col col-6 col-mb-12">
                  <Field
                    v-model="phone"
                    name="phone"
                    v-slot="{ errorMessage, field }"
                    rules="required|tel"
                  >
                    <UiInput
                      theme="dynamic"
                      label="Номер телефона"
                      type="tel"
                      :error="errorMessage"
                      v-bind="field"
                    />
                  </Field>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- next panel -->
        <div class="col col-4 col-sm-12">
          <div class="panel">
            <h3 class="panel__title h3-title">Безопасность</h3>
            <div class="panel__section">
              <div class="password">
                <Field
                  v-model="password"
                  name="password"
                  v-slot="{ errorMessage, field }"
                  rules="required|min:6"
                >
                  <UiInput
                    placeholder="Пароль"
                    :type="passwordMode"
                    :error="errorMessage"
                    v-bind="field"
                  />
                </Field>
                <div class="password__toggle" @click="togglePassword">
                  <SvgIcon name="edit" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- next panel -->

      <div class="panel mt-2">
        <h3 class="panel__title h3-title">Реквизиты</h3>
        <div class="panel__section">
          <div class="row">
            <div class="col col-4 col-mb-12">
              <UiInput label="Название компании" value="ООО ДиджиталРеволюшн" disabled />
            </div>
            <div class="col col-8 col-mb-12">
              <UiInput
                label="Адрес"
                value="Росссия, 461040, Москва, ул. Пионерская, 49/4, офис 14"
                disabled
              />
            </div>
          </div>
          <div class="row mt-1">
            <div class="col col-4 col-mb-12">
              <UiInput label="Банк получателя" value="АО Тинькофф Банк" disabled />
            </div>
            <div class="col col-3 col-md-8 col-mb-12">
              <UiInput label="Счет получателя" value="408568458963215648" disabled />
            </div>
            <div class="col col-5 col-md-12 col-mb-12">
              <div class="row">
                <div class="col col-4 col-mb-6 col-mbs-12">
                  <UiInput label="ИНН" value="377588965412" disabled />
                </div>
                <div class="col col-4 col-mb-6 col-mbs-12">
                  <UiInput label="КПП" value="377588965412" disabled />
                </div>
                <div class="col col-4 col-mb-6 col-mbs-12">
                  <UiInput label="БИК" value="377588965412" disabled />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile__cta">
        <UiButton type="submit">Сохранить изменения</UiButton>
        <UiButton theme="outline" type="button">Отменить изменения</UiButton>
      </div>
    </Form>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      crumbs: [{ icon: "document", to: "/profile", label: "Профиль пользователя" }],
      error: null,
      name: null,
      phone: null,
      password: "123456",
      passwordMode: "password",
    }
  },
  created() {
    this.updateInputFields()
  },
  computed: {
    ...mapGetters("auth", ["user"]),
  },
  methods: {
    togglePassword() {
      if (this.passwordMode === "password") {
        this.passwordMode = "text"
        this.password = ""
      } else {
        this.passwordMode = "password"
        this.password = "123456"
      }
    },
    updateInputFields() {
      this.name = `${this.user.firstName} ${this.user.lastName}`
    },
    async handleSubmit() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return
      }

      this.error = "тестовая ошибка"

      // const { name, company } = this
      // await this.login({ email, password })
      //   .then((_res) => {
      //     this.error = null
      //     this.$router.push("/dashboard")
      //   })
      //   .catch((err) => {
      //     this.error = err
      //     // const { data, code } = err
      //     // if (data && code === 401) {
      //     //   Object.keys(data).forEach((key) => {
      //     //     this.error = data[key]
      //     //   })
      //     // }
      //   })
    },
  },
  watch: {
    user() {
      this.updateInputFields()
    },
  },
}
</script>

<style scoped lang="scss">
.profile {
  &__content {
    margin-top: 32px;
    .error {
      margin-bottom: 16px;
    }
  }
  &__cta {
    margin-top: 25px;
    margin-bottom: -16px;
    .button {
      margin-right: 16px;
      margin-bottom: 16px;
    }
  }
}

.panel {
  flex: 1 0 auto;
  background: #ffffff;
  border-radius: 4px;
  &__title {
    padding: 24px;
    border-bottom: 1px solid #e8e8e8;
  }
  &__section {
    padding: 32px 24px;
    border-bottom: 1px solid #e8e8e8;
    &:last-child {
      border-bottom: 0;
    }
  }
}

.password {
  display: flex;
  align-items: center;
  .input {
    flex: 1 1 auto;
  }
  &__toggle {
    flex: 0 0 auto;
    color: $colorPrimary;
    font-size: 0;
    padding: 10px 10px 10px 16px;
    margin-right: -10px;
    cursor: pointer;
    transition: color 0.25s $ease;
    &:hover {
      color: $colorPrimaryHover;
    }
    .svg-icon {
      font-size: 16px;
    }
  }
}

@include r($hd) {
  .profile {
    &__content {
      margin-top: 18px;
    }
  }

  .panel {
    &__title {
      padding-top: 18px;
      padding-bottom: 18px;
    }
    &__section {
      padding-top: 24px;
      padding-bottom: 24px;
    }
  }
}
</style>
