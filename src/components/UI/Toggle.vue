<template>
  <label :for="uid" class="toggle" :class="[{ 'has-error': error }, { 'no-label': !label }, theme]">
    <div class="toggle__label" v-if="label">{{ label }}</div>
    <div class="toggle__option" :class="[!value && 'active']" v-if="options">{{ options[0] }}</div>
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
    <div class="toggle__option" :class="[value && 'active']" v-if="options">{{ options[1] }}</div>
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
    options: {
      type: Array,
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
    font-weight: bold;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 1.5;
    padding-right: 16px;
    cursor: pointer;
    transition: opacity 0.25s $ease;
    &:hover {
      opacity: 0.8;
    }
  }
  &__option {
    font-weight: bold;
    font-size: 12px;
    color: $colorGray;
    text-transform: uppercase;
    transition: color 0.25s $ease;
    &.active {
      color: $colorPrimary;
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
  &.withOptions {
    .toggle {
      &__label {
        padding-right: 4px;
      }
      &__input {
        margin-left: 8px;
        margin-right: 8px;
      }
      &__input-box {
        background: $colorPrimary;
        border-color: transparent;
        &::after {
          border-color: transparent;
        }
      }
    }
  }
}
</style>
