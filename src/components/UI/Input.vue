<template>
  <div
    class="input"
    :class="[
      { 'has-error': error && !isFocused },
      { 'is-iconed': icon },
      isFocusedOrNotBlank && 'is-focused',
      theme,
    ]"
  >
    <label v-if="label" :for="uid" class="input__label">{{ getLabel }}</label>
    <div
      class="input__input"
      :class="[{ 'is-iconed': icon || clearable, 'is-clearable': isClearable }, iconPosition]"
    >
      <input
        v-if="!isTextArea"
        :id="uid"
        :value="value"
        :placeholder="placeholder"
        v-bind="$attrs"
        @input="setValue"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <textarea
        v-else
        :id="uid"
        :value="value"
        :placeholder="placeholder"
        v-bind="$attrs"
        @input="setValue"
      />

      <span v-if="icon" class="input__icon" :class="[iconPosition]">
        <SvgIcon :name="icon" />
      </span>
      <span v-if="clearable" class="input__clear" @click="clearInput">
        <span>Отмена</span>
      </span>
    </div>

    <div class="input__helper" v-if="helper">{{ helper }}</div>
  </div>
</template>

<script>
// import { useFieldError } from "vee-validate"
import uniqueId from "lodash/uniqueId"

export default {
  name: "Input",
  props: {
    value: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    iconPosition: {
      type: String,
      required: false,
    },
    helper: {
      type: String,
      required: false,
    },
    error: {
      type: [String, Boolean],
      required: false,
    },
    clearable: {
      type: Boolean,
      required: false,
    },
    theme: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isFocused: false,
    }
  },
  computed: {
    uid() {
      return uniqueId()
    },
    isTextArea() {
      return this.$attrs.textarea !== undefined
    },
    isFocusedOrNotBlank() {
      if (this.value && this.value.trim().length > 0) {
        return true
      }
      return this.isFocused
    },
    isClearable() {
      if (this.clearable) {
        return this.value && this.value.replace(/^\s+|\s+$/g, "").length > 1
      } else {
        return false
      }
    },
    // error() {
    //   const message = useFieldError()
    //   return message.value
    // },
    getLabel() {
      return typeof this.error === "string" && !this.isFocused
        ? // ? this.parseVeeError(this.error)
          this.label
        : this.label
    },
  },
  mounted() {
    document.addEventListener("onautocomplete", this.handleAutocompleate, false)
  },
  beforeUnmount() {
    if (this.$refs.dialogs) {
      document.removeEventListener("onautocomplete", this.handleAutocompleate, false)
    }
  },
  methods: {
    setValue(e) {
      this.$emit("onChange", e.target.value)
    },
    handleAutocompleate(e) {
      if (parseInt(e.target.getAttribute("id")) === this._uid) {
        if (e.target.hasAttribute("autocompleted")) {
          this.isFocused = true
        }
      }
    },
    handleFocus(e) {
      this.isFocused = true
    },
    handleBlur() {
      this.isFocused = false
    },
    clearInput() {
      if (this.isClearable) {
        this.$emit("onChange", "")
      }
    },
    parseVeeError(err) {
      return err.replaceAll("{field}", "")
    },
  },
}
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  &__label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
    font-family: $baseFont;
    color: $fontColor;
    margin-bottom: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__input {
    position: relative;
    z-index: 1;
    input,
    textarea {
      -webkit-appearance: none;
      display: block;
      width: 100%;
      padding: 17px 16px 16px;
      border: 1px solid $borderColor;
      background: white;
      border-radius: 4px;
      font-family: $baseFont;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5;
      color: $fontColor;
      transition: border 0.25s $ease, color 0.25s $ease, background 0.25s $ease;
      &::placeholder {
        color: $colorGray;
      }
      &:focus,
      &:active {
        outline: none;
        border-color: $colorGray;
      }
      &:hover {
        // background-color: #f7f6f7;
        border-color: $colorGray;
      }
      &[readonly],
      &[disabled] {
        color: $colorGray;
        background: $colorBg;
        border-color: transparent;
        &:focus,
        &:active {
          border-color: $borderColor;
        }
      }
    }
    textarea {
      resize: vertical;
    }
    &.is-iconed {
      input,
      textarea {
        padding-right: 45px;
      }
      &.left {
        input,
        textarea {
          padding-left: 45px;
          padding-right: 14px;
        }
      }
    }
    &.is-clearable {
      input,
      textarea {
        padding-right: 45px;
      }
      .input__clear {
        opacity: 1;
        pointer-events: all;
      }
      &.is-iconed {
        .input__icon:not(.left) {
          opacity: 0;
          pointer-events: none;
        }
      }
    }
  }
  &__icon {
    position: absolute;
    z-index: 2;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0;
    pointer-events: none;
    transition: opacity 0.25s $ease, fill 0.25s $ease;
    &.left {
      left: 15px;
      right: auto;
    }
    .svg-icon {
      font-size: 16px;
      color: $colorPrimary;
    }
  }
  &__clear {
    position: absolute;
    z-index: 2;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 8px 16px 7px 16px;
    color: $colorPrimary;
    font-size: 14px;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: color 0.25s $ease;
    &::before {
      display: inline-block;
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 1px;
      background: rgba(#171818, 0.1);
    }
    &:hover {
      color: $fontColor;
    }
  }
  &__helper {
    margin-top: 12px;
    font-size: 12px;
    line-height: (20 / 12);
    letter-spacing: -0.01em;
    color: $colorGray;
  }
  &.has-error {
    .input__input {
      input,
      textarea {
        border-color: $colorRed;
      }
    }
    .input__label {
      color: $colorRed;
    }
  }

  &.dynamic {
    .input__label {
      position: absolute;
      top: 19px;
      left: 16px;
      font-size: 14px;
      font-weight: 500;
      color: $colorGray;
      z-index: 2;
      pointer-events: none;
      transition: all 0.25s ease-in-out;
    }
    .input__input {
      input,
      textarea {
        padding-top: 23px;
        padding-bottom: 10px;
      }
    }
    &.is-focused {
      .input__label {
        top: 8px;
        font-size: 11px;
      }
    }
    &.has-error {
      .input__label {
        top: 8px;
        font-size: 11px;
      }
    }
    &.is-iconed.left {
      .input__label {
        left: 45px;
      }
    }
  }
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
</style>
