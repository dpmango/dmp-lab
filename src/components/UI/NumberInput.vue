<template>
  <div
    class="input"
    :class="[{ 'has-error': error && !isFocused }, isFocusedOrNotBlank && 'is-focused']"
  >
    <label v-if="label" :for="uid" class="input__label">{{ getLabel }}</label>
    <div class="input__input">
      <input
        :id="uid"
        :value="value"
        v-bind="$attrs"
        @input="setValue"
        @keypress="isNumber"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <div class="input__helper" v-if="helper">
        <span>{{ helper }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { useFieldError } from "vee-validate"
import uniqueId from "lodash/uniqueId"

export default {
  name: "NumberInput",
  props: {
    value: {
      type: String,
      required: false,
    },
    label: {
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
    isFocusedOrNotBlank() {
      if (this.value && this.value.trim().length > 0) {
        return true
      }
      return this.isFocused
    },
    // error() {
    //   const message = useFieldError()
    //   return message.value
    // },
    getLabel() {
      return typeof this.error === "string" && !this.isFocused
        ? this.parseVeeError(this.error)
        : this.label
    },
  },
  methods: {
    isNumber(e) {
      if (isNaN(Number(e.key))) {
        return e.preventDefault()
      }
    },
    setValue(e) {
      this.$emit("onChange", e.target.value)
    },
    handleFocus(e) {
      this.isFocused = true
    },
    handleBlur() {
      this.isFocused = false
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
    font-size: 12px;
    font-weight: 600;
    font-family: $baseFont;
    color: $colorGray;
    margin-bottom: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__input {
    position: relative;
    z-index: 1;
    display: flex;
    border: 1px solid $borderColor;
    border-radius: 4px;
    overflow: hidden;
    transition: border 0.25s $ease;
    input,
    textarea {
      -webkit-appearance: none;
      display: block;
      width: 100%;
      padding: 11px 12px;
      border: 0;
      background: white;
      border-radius: 4px;
      font-family: $baseFont;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
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
  }

  &__helper {
    padding: 12px 24px;
    color: $colorGray;
    background: $colorBg;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    span {
      font-size: 12px;
    }
  }

  // &.is-focused{
  //   .input__input input{

  //   }
  // }

  &.has-error {
    .input__input {
      border-color: $colorRed;
    }
    .input__label {
      color: $colorRed;
    }
  }
}
</style>
