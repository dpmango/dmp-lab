<template>
  <router-view />
</template>

<script>
import { ScrollTo } from "@/utils"

export default {
  data() {
    return {
      loading: true,
    }
  },
  async mounted() {
    // await this.$store.dispatch("init")
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
