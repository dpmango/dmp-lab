<template>
  <label :for="uid" class="toggle" :class="[{ 'has-error': error }, { 'no-label': !label }, theme]">
    <div class="toggle__label" v-if="label">{{ label }}</div>
    <div class="toggle__input">
      <input
        :id="uid"
        type="checkbox"
        :checked="value"
        :value="value"
        v-bind="$attrs"
        @input="setValue"
      />
      <div class="toggle__input-box"></div>
    </div>
  </label>
</template>

<script>
import uniqueId from "lodash/uniqueId"

export default {
  name: "Toggle",
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
.toggle {
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
      &:checked + .toggle__input-box {
        background: $colorPrimary;
        border-color: transparent;
        &::after {
          left: 18px;
          border-color: transparent;
        }
      }
    }
  }
  &__input-box {
    position: relative;
    width: 36px;
    height: 20px;
    background: white;
    border: 2px solid #dae4ed;
    border-radius: 100px;
    &::after {
      display: inline-block;
      content: " ";
      box-sizing: border-box;
      position: absolute;
      top: 2px;
      left: 2px;
      width: 12px;
      height: 12px;
      background: #fff;
      border: 2px solid $borderColor;
      border-radius: 100px;
      transition: 0.25s $ease;
    }
  }
}
</style>
