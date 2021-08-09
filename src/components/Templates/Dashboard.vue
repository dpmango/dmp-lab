<template>
  <div class="page">
    <div class="page__content">
      <Header />
      <div class="dashboard">
        <div
          class="dashboard__sidebar"
          :class="[sidebarOpened && 'active']"
          v-click-outside="closeSidebar"
        >
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
import { mapState, mapMutations } from "vuex"

export default {
  data: () => ({}),
  computed: {
    classesApp() {
      return this.$route.matched.map(({ meta }) => meta.app)
    },
    ...mapState("ui", ["sidebarOpened"]),
  },
  methods: {
    closeSidebar(e) {
      e.stopPropagation()
      // if (this.sidebarOpened) {
      //   this.setSidebar(false)
      // }
    },
    ...mapMutations("ui", ["setSidebar"]),
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
    position: fixed;
    z-index: 8;
    top: 100px;
    max-width: 336px;
    height: calc(100vh - 100px);
    background: white;
  }
  &__content {
    position: relative;
    z-index: 1;
    margin-left: 336px;
    max-width: 100%;
    background: #f5f7fb;
    padding: 32px 56px 32px 40px;
  }
}

@include r($hd) {
  .dashboard {
    &__sidebar {
      max-width: 272px;
    }
    &__content {
      padding-top: 24px;
      margin-left: 272px;
      max-width: 100%;
    }
  }
}

@include r($xl) {
  .dashboard {
    padding-top: 60px;
    &__sidebar {
      flex: 0 0 235px;
      max-width: 235px;
      top: 60px;
      height: calc(100vh - 60px);
    }
    &__content {
      margin-left: 235px;
      padding-right: 20px;
      padding-left: 32px;
      padding-top: 32px;
    }
  }
}

@include r($lg) {
  // .dashboard {
  // }
}

@include r($md) {
  .dashboard {
    &__sidebar {
      box-shadow: 0 0 20px rgba(black, 0.1);
      transform: translate3d(-100%, 0, 0);
      pointer-events: none;
      will-change: transform;
      transition: transform 0.25s $ease;
      &.active {
        transform: none;
        pointer-events: all;
      }
    }
    &__content {
      margin-left: 0;
      padding-left: 20px;
    }
  }
}
</style>
