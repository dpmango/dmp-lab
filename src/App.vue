<template>
  <router-view />
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex"
import { ScrollTo } from "@/utils"

export default {
  data() {
    return {
      loading: true,
    }
  },
  async created() {
    try {
      await this.$store.dispatch("init")
    } catch (e) {
      this.$router.push("/login")
    }

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
    // ...mapMutations("router", ["setFromRoute"]),
  },
  watch: {
    $route(to, from) {
      // this.setFromRoute(from)
      ScrollTo(0, 300)
    },
  },
}
</script>

<style lang="scss">
@import "@/assets/styles/index.scss";
</style>
