<template>
  <div class="page">
    <div class="page__content">
      <Header />
      <div class="dashboard">
        <div class="dashboard__sidebar">
          <Sidebar />
        </div>
        <div class="dashboard__content">
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
