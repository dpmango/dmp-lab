<template>
  <div class="tmp">
    <div class="container">
      <div class="tmp__wrapper">
        <div class="tmp__logo">
          <SvgIcon name="logo" />
        </div>

        <div class="mt-2">
          <p class="big">🚧</p>
          <p class="c-gray">
            🤘 Добро пожаловать! <br />
            Страница в разработке 🐣
          </p>
        </div>

        <div class="mt-2">
          <router-link to="/dashboard"><UiButton>Перейти в дашборд</UiButton></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.tmp {
  &__wrapper {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    padding: 56px 0;
    text-align: center;
    font-size: 1.5em;
  }
  &__logo {
    color: $colorPrimary;
    font-size: 0;
    .svg-icon {
      font-size: 36px;
    }
  }
}

.big {
  font-size: 80px;
}
</style>
