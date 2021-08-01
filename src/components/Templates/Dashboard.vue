<template>
  <div class="page dashboard">
    <div class="page__content">
      <slot />
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
