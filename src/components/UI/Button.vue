<template>
  <button
    :class="['button', theme, size, isBlock, noPadding, { 'is-loading': showLoader }]"
    v-bind="$attrs"
  >
    <div class="button__icon left" v-if="iconLeft">
      <SvgIcon :name="iconLeftName" :style="iconLeftStyle" />
    </div>
    <div class="button__text">
      <slot />
    </div>
    <div class="button__icon right" v-if="iconRight">
      <SvgIcon :name="iconRightName" :style="iconRightStyle" />
    </div>

    <UiLoader v-if="showLoader" :loading="showLoader" :color="loaderColor" />
  </button>
</template>

<script>
// import { h, resolveDynamicComponent } from "vue"

const loaderDelay = 300

export default {
  name: "Button",

  props: {
    theme: {
      type: String,
      default: "primary",
      validator: (theme) => ["primary", "outline", "danger", "success", "clear"].includes(theme),
    },
    size: {
      type: String,
      default: "regular",
      validator: (theme) => ["regular", "small", "big"].includes(theme),
    },
    iconLeft: {
      type: String,
      required: false,
    },
    iconRight: {
      type: String,
      required: false,
    },
    isLoading: {
      type: Boolean,
      required: false,
    },
    loaderColor: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      showLoader: false,
      timer: null,
    }
  },
  computed: {
    iconLeftName() {
      return this.iconLeft.split(":")[0]
    },
    iconLeftStyle() {
      const splitClassname = this.iconLeft.split(":")
      if (splitClassname[1]) {
        return { fontSize: splitClassname[1] + "px" }
      }

      return {}
    },
    iconRightName() {
      return this.iconRight.split(":")[0]
    },
    iconRightStyle() {
      const splitClassname = this.iconRight.split(":")
      if (splitClassname[1]) {
        return { fontSize: splitClassname[1] + "px" }
      }

      return {}
    },
    isBlock() {
      if (this.$attrs.block !== undefined) {
        return "block"
      }
      return ""
    },
    noPadding() {
      if (this.$attrs["no-padding"] !== undefined) {
        return "no-padding"
      }
      return ""
    },
  },
  watch: {
    isLoading(newV, _oldV) {
      if (newV) {
        this.timer = setTimeout(() => {
          this.showLoader = true
        }, loaderDelay)
      } else {
        clearTimeout(this.timer)
        this.showLoader = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 13px 24px;
  border: 1px solid transparent;
  box-sizing: border-box;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  box-shadow: none;
  transition: background 0.25s $ease, color 0.25s $ease;
  &:focus,
  &:active {
    outline: none;
  }

  &__icon {
    flex: 0 0 auto;
    font-size: 0px;
    transition: color 0.25s $ease, opacity 0.25s $ease;
    .svg-icon {
      font-size: 16px;
    }
    &.left {
      margin-right: 8px;
    }
    &.right {
      margin-left: 8px;
    }
  }

  &.primary {
    background: $colorPrimary;
    color: #fff;
    border-color: transparent;

    &:hover {
      background: $colorPrimaryHover;
    }
    &:active {
      background: $colorPrimaryHover;
    }
  }
  &.outline {
    color: $fontColor;
    background: transparent;
    border-color: $colorPrimary;
    &:hover,
    &:active {
      border-color: $colorPrimaryHover;
      color: $colorPrimary;
    }
    &:active {
      background: rgba($colorPrimaryHover, 0.2);
    }
  }
  &.danger {
    color: white;
    background: $colorRed;
    border-color: transparent;
    &:hover {
      background: rgba($colorRed, 0.8);
    }
    &:active {
      background: rgba($colorRed, 0.9);
    }
  }
  &.success {
    color: white;
    background: $colorGreen;
    border-color: transparent;
    &:hover {
      background: rgba($colorGreen, 0.8);
    }
    &:active {
      background: rgba($colorGreen, 0.9);
    }
  }

  &.clear {
    background: transparent;
    border-color: transparent;
    color: $fontColor;
    .button__icon {
      color: #dadada;
    }
    &:hover {
      background: $colorBg;
      .button__icon {
        color: $colorPrimary;
      }
    }
    &:active {
      background: darken($colorBg, 5%);
    }
  }

  &.small {
    font-size: 14px;
    padding: 9px 16px;
    border-radius: 6px;
  }
  &.big {
    font-size: 18px;
    padding: 17px 24px;
  }

  &.block {
    display: block;
    width: 100%;
  }

  &.no-padding {
    padding: 0;
  }

  &[disabled] {
    background: rgba($fontColor, 0.3);
    color: rgba($fontColor, 0.7);
    pointer-events: none;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.is-loading {
    color: transparent !important;
  }
}
</style>
