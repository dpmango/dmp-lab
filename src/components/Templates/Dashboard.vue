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

<style scoped lang="scss">
.dashboard {
  display: flex;
  padding-top: 100px;
  min-height: 100vh;
  &__sidebar,
  &__content {
    width: 100%;
    min-width: 1px;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }
  &__sidebar {
    flex: 0 0 336px;
    max-width: 336px;
    background: white;
  }
  &__content {
    flex: 0 0 calc(100% - 336px);
    max-width: calc(100% - 336px);
    background: #f5f7fb;
    padding: 32px 56px 32px 40px;
  }
}

@include r($hd) {
  .dashboard {
    &__sidebar {
      flex: 0 0 272px;
      max-width: 272px;
    }
    &__content {
      flex: 0 0 calc(100% - 272px);
      max-width: calc(100% - 272px);
    }
  }
}

@include r($xl) {
  .dashboard {
    &__sidebar {
      flex: 0 0 235px;
      max-width: 235px;
    }
    &__content {
      flex: 0 0 calc(100% - 235px);
      max-width: calc(100% - 235px);
    }
  }
}
</style>
