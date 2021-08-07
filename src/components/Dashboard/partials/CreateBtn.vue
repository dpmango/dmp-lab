<template>
  <button class="create-btn" v-bind="$attrs">
    <div class="create-btn__icon">
      <SvgIcon name="plus" />
    </div>
    <div class="create-btn__text"><slot /></div>
  </button>
</template>

<style scoped lang="scss">
.create-btn {
  display: inline-flex;
  align-items: center;
  &__icon {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: $colorPrimary;
    border-radius: 8px;
    color: white;
    transition: background 0.25s $ease;
  }
  &__text {
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    color: $colorPrimary;
    margin-left: 8px;
    transition: color 0.25s $ease;
  }
  &:hover {
    .create-btn {
      &__icon {
        background: $colorPrimaryHover;
      }
      &__text {
        color: $colorPrimaryHover;
      }
    }
  }
}
</style>
