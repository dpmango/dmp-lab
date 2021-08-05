<template>
  <label
    :for="uid"
    class="checkbox"
    :class="[{ 'has-error': error }, { 'no-label': !label }, theme]"
  >
    <div class="checkbox__label" v-if="label">{{ label }}</div>
    <div class="checkbox__input">
      <input
        :id="uid"
        type="checkbox"
        :checked="value"
        :value="value"
        v-bind="$attrs"
        @input="setValue"
      />
      <div class="checkbox__input-box">
        <SvgIcon name="check" />
      </div>
    </div>
  </label>
</template>

<script>
import uniqueId from "lodash/uniqueId"

export default {
  name: "Checkbox",
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
.checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  &.no-label {
    display: block;
  }
  &__label {
    position: relative;
    z-index: 2;
    font-size: 15px;
    padding-right: 16px;
    cursor: pointer;
    transition: opacity 0.25s $ease;
    &:hover {
      opacity: 0.8;
    }
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
      &:checked + .checkbox__input-box {
        background: $colorPrimary;
        border-color: transparent;
        .svg-icon {
          opacity: 1;
          transform: scale(1);
        }
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
    background: transparent;
    border: 1px solid #cdced9;
    color: white;
    border-radius: 2px;
    .svg-icon {
      font-size: 9px;
      opacity: 0;
      transform: scale(0);
      will-change: transform;
      transition: opacity 0.25s $ease, transform 0.25s $ease;
    }
  }
}
</style>
