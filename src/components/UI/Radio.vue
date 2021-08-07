<template>
  <label :for="uid" class="radio" :class="[{ 'has-error': error }, { 'no-label': !label }, theme]">
    <div class="radio__input">
      <input
        :id="uid"
        type="radio"
        :checked="value"
        :value="value"
        v-bind="$attrs"
        @input="setValue"
      />
      <div class="radio__input-box">
        <SvgIcon name="check" />
      </div>
    </div>
    <div class="radio__content">
      <div class="radio__label" v-if="label">{{ label }}</div>
      <div class="radio__helper" v-if="helper">
        {{ helper }}
      </div>
    </div>
  </label>
</template>

<script>
import uniqueId from "lodash/uniqueId"

export default {
  name: "Radio",
  props: {
    value: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    error: {
      type: [String, Boolean],
      required: false,
    },
    helper: {
      type: String,
      required: false,
    },
    theme: {
      type: String,
      required: false,
    },
  },
  computed: {
    uid() {
      return uniqueId()
    },
  },
  methods: {
    setValue(e) {
      this.$emit("onChange", !this.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.radio {
  position: relative;
  display: inline-flex;
  cursor: pointer;
  &.no-label {
    display: block;
  }
  &__content {
    padding-top: 4px;
    padding-left: 8px;
  }
  &__label {
    position: relative;
    z-index: 2;
    font-weight: 700;
    font-size: 12px;
    line-height: 1.5;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity 0.25s $ease;
    &:hover {
      opacity: 0.8;
    }
  }
  &__helper {
    margin-top: 6px;
    font-size: 12px;
    color: $colorGray;
  }
  &__input {
    position: relative;
    input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 0.1px;
      height: 0.1px;
      overflow: hidden;
      &:checked + .radio__input-box {
        background: $colorPrimary;
        color: white;
      }
    }
  }
  &__input-box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    background: $colorBg;
    // border: 1px solid #cdced9;
    // color: white;
    color: $colorGray;
    border-radius: 50%;
    transition: 0.25s $ease;
    .svg-icon {
      font-size: 7px;
    }
  }
}
</style>
