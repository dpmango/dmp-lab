<template>
  <div class="auth">
    <div class="container">
      <div class="auth__wrapper">
        <div class="auth__logo">
          <SvgIcon name="logo" />
        </div>
        <div class="auth__box">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    classesApp() {
      return this.$route.matched.map(({ meta }) => meta.app)
    },
  },
  watch: {
    // isAuthenticated(v) {
    //   if (v) {
    //     this.connectSocket()
    //   }
    // },
  },
}
</script>

<style scoped lang="scss">
.auth {
  &__wrapper {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    padding: 56px 0;
  }
  &__logo {
    color: $colorPrimary;
    font-size: 0;
    text-align: center;
    .svg-icon {
      font-size: 36px;
    }
  }
  &__box {
    background: white;
    border-radius: 14px;
    padding: 40px 56px;
    margin-top: 32px;
  }
}
</style>
