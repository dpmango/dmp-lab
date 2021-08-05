<template>
  <div class="pagination">
    <div class="pagination__list">
      <div
        class="pagination__item"
        :class="[item === meta.current && 'is-active']"
        v-for="(item, idx) in items"
        :key="idx"
      >
        <span v-if="typeof item === 'number'" @click="$emit('onChange', item)">{{ item }}</span>
        <span v-else>...</span>
      </div>
    </div>
    <div class="pagination__buttons">
      <button class="prev" @click="handlePrev">
        <SvgIcon name="caret" />
      </button>
      <button class="next" @click="handleNext">
        <SvgIcon name="caret" />
      </button>
    </div>
  </div>
</template>

<script>
// import { mapMutations, mapActions } from "vuex"
import { paginationBuilder } from "@/utils/Pagination"

export default {
  props: {
    meta: Object,
  },
  computed: {
    items() {
      const { total, current } = this.meta

      return paginationBuilder(current, total)
    },
    prevAvailable() {
      return this.meta.current > 1
    },
    nextAvailable() {
      return this.meta.current < this.meta.total
    },
  },
  methods: {
    handlePrev() {
      if (this.prevAvailable) {
        this.$emit("onChange", this.meta.current - 1)
      }
    },
    handleNext() {
      if (this.nextAvailable) {
        this.$emit("onChange", this.meta.current + 1)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  &__list {
    display: flex;
    margin-right: 24px;
  }
  &__item {
    flex: 0 0 auto;
    cursor: pointer;
    font-size: 12px;
    min-width: 20px;
    color: $colorGray;
    text-align: center;
    border-radius: 2px;
    transition: color 0.25s $ease;
    span {
      display: inline-block;
      padding: 5px 4px;
    }
    &.is-active {
      background: white;
    }
    &:hover {
      color: $colorPrimary;
    }
  }
  &__separator {
    font-size: 12px;
    color: $colorAccent;
    padding: 5px;
  }
  &__buttons {
    flex: 0 0 auto;
    button {
      position: relative;
      z-index: 1;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      border: 1px solid rgba(155, 166, 183, 0.2);
      border-radius: 10px;
      font-size: 8px;
      color: $colorAccent;
      text-align: center;
      transition: border 0.25s $ease, color 0.25s $ease;
      &.prev {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        .svg-icon {
          transform: rotate(90deg);
        }
      }
      &.next {
        margin-left: -1px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        .svg-icon {
          transform: rotate(-90deg);
        }
      }
      &:hover {
        border-color: $colorAccent;
        z-index: 2;
      }
    }
  }
}
</style>
