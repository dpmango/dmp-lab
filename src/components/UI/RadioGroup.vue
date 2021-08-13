<template>
  <div class="radiogroup" :class="theme">
    <div class="radiogroup__label" v-if="label">{{ label }}</div>

    <div class="radiogroup__row">
      <UiButton
        v-for="option in options"
        :key="option.id"
        type="button"
        class="radiogroup__item"
        :theme="option.id === activeId ? 'primary' : 'outline'"
        :class="[{ 'has-error': error }, { active: option.id === activeId }, theme]"
        iconLeft="check-boxed:12"
        @click="setValue(option)"
      >
        <span>{{ option.label }}</span>
        <p v-if="option.helper" v-html="option.helper" />
      </UiButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    options: {
      type: Array,
      required: true,
    },
    activeId: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    error: {
      type: [String, Boolean],
      required: false,
    },
    theme: {
      type: String,
      required: false,
    },
  },
  computed: {},
  methods: {
    setValue(option) {
      this.$emit("onChange", option.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.radiogroup {
  position: relative;
  &__label {
    position: relative;
    z-index: 2;
    font-size: 12px;
    margin-bottom: 12px;
    color: $colorGray;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: -8px;
  }
  &__item {
    // button modifier
    justify-content: flex-start;
    padding: 17px 16px 16px;
    margin-right: 16px;
    margin-bottom: 8px;
    font-size: 12px;
    text-align: left;
    transition: background 0.25s $ease, color 0.25s $ease, padding 0.25s $ease;
    ::v-deep p {
      margin-top: 8px;
      display: block;
      font-weight: 400;
      font-size: 12px;
      line-height: 1.5;
      margin-bottom: 0;
      color: $colorGray;
      transition: color 0.25s $ease;
    }
    ::v-deep .button__text {
      display: block;
    }
    ::v-deep .button__icon {
      position: absolute;
      left: 8px;
      opacity: 0;
      color: white;
    }
    &.active {
      padding-left: 24px;
      padding-right: 8px;
      ::v-deep .button__icon {
        opacity: 1;
      }
    }
    &.detailed {
      margin-right: 24px;
      padding-right: 26px;
      padding-left: 36px;
      ::v-deep span {
        text-transform: uppercase;
      }
      ::v-deep .button__icon {
        left: 16px;
        opacity: 1;
        top: 18px;
        color: $colorBg;
      }
      &.active {
        ::v-deep p {
          color: rgba(white, 0.7);
        }
        ::v-deep .button__icon {
          color: white;
        }
      }
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
