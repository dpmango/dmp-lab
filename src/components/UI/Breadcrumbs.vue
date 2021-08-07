<template>
  <div class="breadcrumbs">
    <div class="breadcrumbs__list">
      <div class="crumb first" v-if="includeHome">
        <div class="crumb__icon">
          <SvgIcon name="dashboard" />
        </div>
        <div class="crumb__title">Дашборд</div>
      </div>
      <router-link :to="item.to" class="crumb" v-for="(item, idx) in list" :key="idx">
        <div class="crumb__separator">
          <SvgIcon name="dots" />
        </div>
        <div class="crumb__icon">
          <SvgIcon :name="item.icon" />
        </div>
        <div class="crumb__title">{{ item.label }}</div>
      </router-link>
    </div>
    <div class="breadcrumbs__title" v-if="includeTitle && title">
      <div class="breadcrumbs__title-back" @click="handleBackClick">
        <SvgIcon name="arrow-back" />
      </div>
      <div class="h2-title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    includeHome: {
      type: Boolean,
      default: true,
    },
    includeTitle: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    title() {
      const last = this.list[this.list.length - 1]
      if (last) {
        return last.title || last.label
      }

      return null
    },
    backRoute() {
      const lastPrev = this.list[this.list.length - 2]
      if (lastPrev) {
        return lastPrev.to
      }

      return "/dashboard"
    },
  },
  methods: {
    handleBackClick() {
      // TODO $router.back - problem using navigation guards
      // try moving to vuex beforerouteenter
      this.$router.push(this.backRoute)
    },
  },
}
</script>

<style scoped lang="scss">
.breadcrumbs {
  &__list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  &__title {
    display: flex;
    align-items: center;
    margin-left: -12px;
    margin-top: 14px;
  }
  &__title-back {
    font-size: 0;
    color: $colorGray;
    padding: 10px 12px;
    cursor: pointer;
    transition: color 0.25s $ease;
    .svg-icon {
      font-size: 16px;
    }
    &:hover {
      color: $colorPrimary;
    }
  }
}

.crumb {
  display: inline-flex;
  align-items: center;
  &__icon {
    flex: 0 0 auto;
    font-size: 0;
    color: $colorPrimary;
    margin-right: 8px;
    .svg-icon {
      font-size: 14px;
    }
  }
  &__separator {
    margin-left: 19px;
    margin-right: 14px;
    font-size: 0;
    color: $colorGray;
    .svg-icon {
      font-size: 4px;
    }
  }
  &__title {
    font-size: 16px;
    font-weight: 500;
  }
  &.first {
    .crumb__icon,
    .crumb__title {
      color: $colorGray;
    }
  }
  &::after {
    display: inline-block;
    content: "";
  }
}

@include r($hd) {
  .breadcrumbs {
    &__title {
      margin-top: 12px;
    }
  }
  .crumb {
    &__separator {
      margin-left: 12px;
      margin-right: 12px;
    }
    &__title {
      font-size: 14px;
    }
  }
}
</style>
