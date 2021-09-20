<template>
  <div class="auth">
    <div class="auth__title h2-title">Войти</div>

    <Form ref="form" as="form" class="auth__form" @submit="handleSubmit">
      <UiError :error="error" />

      <Field
        v-model="email"
        name="email"
        type="email"
        v-slot="{ errorMessage, field }"
        rules="email|required"
      >
        <UiInput
          theme="dynamic"
          label="Email"
          class="ui-group"
          :error="errorMessage"
          v-bind="field"
        />
      </Field>
      <Field
        v-model="password"
        name="password"
        type="password"
        v-slot="{ errorMessage, field }"
        class="ui-group"
        rules="required"
      >
        <UiInput
          theme="dynamic"
          label="Пароль"
          class="ui-group"
          :error="errorMessage"
          v-bind="field"
        />
      </Field>

      <UiButton type="submit" size="big" block>Войти</UiButton>
    </Form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  data() {
    return {
      email: "test@test.ru",
      password: "test",
      error: null,
    }
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.push("/dashboard")
    }
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return
      }

      const { email, password } = this
      await this.login({ email, password })
        .then((_res) => {
          this.error = null
          this.$router.push("/dashboard")
        })
        .catch((err) => {
          console.log("catched an error", err)
          this.error = err.data
        })
    },
    ...mapActions("auth", ["login"]),
  },
}
</script>

<style scoped lang="scss">
.auth {
  &__title {
    font-weight: 600;
    font-size: 24px;
    text-align: center;
  }
  &__form {
    margin-top: 24px;
    .error {
      margin-bottom: 16px;
    }
    .ui-group {
      margin-bottom: 24px;
    }
  }
}
</style>
