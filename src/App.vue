<template>
  <router-view />
</template>

<script>
import { mapGetters } from "vuex"
import { ScrollTo } from "@/utils"

export default {
  data() {
    return {
      loading: true,
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      if (to.meta && to.meta.protected && !this.isAuthenticated) next({ name: "Login" })
      else next()
    })
  },
  async mounted() {
    // await this.$store.dispatch("init")
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  watch: {
    $route() {
      ScrollTo(0, 300)
    },
  },
}
</script>

<style lang="scss">
@import "@/assets/styles/index.scss";
</style>
