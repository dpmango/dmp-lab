<template>
  <div class="support">
    <UiBreadcrumbs :list="crumbs" />

    <Form ref="form" as="form" class="support__content" @submit="handleSubmit">
      <div class="row">
        <div class="col col-6 col-xl-12">
          <div class="panel">
            <h3 class="panel__title h3-title">Ваши данные</h3>
            <div class="panel__section">
              <UiError :error="error" />

              <div class="row">
                <div class="col col-6 col-mb-12">
                  <Field
                    v-model="name"
                    name="name"
                    v-slot="{ errorMessage, field }"
                    rules="required"
                  >
                    <UiInput theme="dynamic" label="ФИО" :error="errorMessage" v-bind="field" />
                  </Field>
                </div>
                <div class="col col-6 col-mb-12">
                  <Field v-model="company" name="company" v-slot="{ errorMessage, field }">
                    <UiInput
                      theme="dynamic"
                      label="Название компании"
                      :error="errorMessage"
                      v-bind="field"
                    />
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
                <div class="col col-6 col-mb-12">
                  <Field
                    v-model="email"
                    name="email"
                    v-slot="{ errorMessage, field }"
                    rules="required|email"
                  >
                    <UiInput
                      theme="dynamic"
                      label="Email"
                      type="email"
                      :error="errorMessage"
                      v-bind="field"
                    />
                  </Field>
                </div>
              </div>
            </div>
            <div class="panel__section">
              <h5 class="h5-title">Когда с Вами удобнее связаться?</h5>

              <div class="mt-1">
                <div class="row">
                  <div class="col col-6 col-mb-12">
                    <DatePicker v-model="date">
                      <template v-slot="{ inputValue, inputEvents }">
                        <UiInput
                          theme="dynamic"
                          label="Укажите дату"
                          icon="calendar"
                          iconPosition="right"
                          :value="inputValue"
                          v-on="inputEvents"
                        />
                      </template>
                    </DatePicker>
                  </div>
                  <div class="col col-6 col-mb-12">
                    <DatePicker v-model="time" mode="time">
                      <template v-slot="{ inputValue, inputEvents }">
                        <UiInput
                          theme="dynamic"
                          label="Укажите время"
                          icon="time"
                          iconPosition="right"
                          :value="inputValue"
                          v-on="inputEvents"
                        />
                      </template>
                    </DatePicker>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- next panel -->
        <div class="col col-5 col-hd-6 col-xl-12">
          <div class="panel">
            <h3 class="panel__title h3-title">Ваши данные</h3>
            <div class="panel__section">
              <div class="row">
                <div class="col col-12">
                  <Field
                    v-model="topic"
                    name="topic"
                    v-slot="{ errorMessage, field }"
                    rules="required"
                  >
                    <UiInput
                      theme="dynamic"
                      label="Тема обращения"
                      :error="errorMessage"
                      v-bind="field"
                    />
                  </Field>
                </div>
                <div class="col col-12">
                  <Field v-model="comment" name="comment" v-slot="{ errorMessage, field }">
                    <UiInput
                      textarea
                      rows="7"
                      placeholder="Опишите суть проблемы"
                      :error="errorMessage"
                      v-bind="field"
                    />
                  </Field>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="support__cta">
        <UiButton type="submit">Отправить обращение</UiButton>
      </div>
    </Form>
  </div>
</template>

<script>
import djs from "dayjs"

export default {
  data() {
    return {
      crumbs: [{ icon: "support", to: "/support", label: "Обращение в техподдержку" }],
      error: null,
      name: null,
      company: null,
      phone: null,
      email: null,
      date: null,
      time: new Date(),
      topic: null,
      comment: null,
    }
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return
      }

      const { name, company } = this
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
    date(val) {
      const valDjs = djs(val)
      const timeDjs = djs(this.time)

      this.time = djs(`${valDjs.format("YYYY-MM-DD")} ${timeDjs.format("HH:mm")}`).toDate()
    },
  },
}
</script>

<style scoped lang="scss">
.support {
  &__content {
    margin-top: 32px;
    .error {
      margin-bottom: 16px;
    }
  }
  &__cta {
    margin-top: 25px;
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
    padding: 24px;
    border-bottom: 1px solid #e8e8e8;
    &:last-child {
      border-bottom: 0;
    }
  }
}

@include r($hd) {
  .support {
    &__content {
      margin-top: 18px;
    }
  }

  .panel {
    &__title {
      padding-top: 18px;
      padding-bottom: 18px;
    }
  }
}
</style>
