<template>
  <DashboardTemplate>
    <div class="section">
      <h1 class="h1-title title">Иконки</h1>
      <div class="icons">
        <span class="ico" v-for="(icon, idx) in icons" :key="idx">
          <SvgIcon :name="icon" />
          <div class="c-accent">{{ icon }}</div>
        </span>
      </div>
    </div>

    <div class="section">
      <h1 class="h1-title title">Инпуты / инетрфейс</h1>
      <div class="inputs">
        <div class="input">
          <UiInput label="лейбл" placeholder="подсказка" />
        </div>
        <div class="input">
          <UiCheckbox label="лейбл" />
        </div>
        <div class="input">
          <UiToggle label="лейбл" />
        </div>
        <div class="input">
          <UiLoader :loading="true" />
        </div>
        <div class="input">
          <UiPagination :meta="pagination" @onChange="(x) => (pagination.current = x)" />
        </div>
        <div class="input">
          <DatePicker v-model="date"> </DatePicker>
        </div>
      </div>
    </div>

    <div class="section">
      <h1 class="h1-title title">Кнопки</h1>
      <div class="btns">
        <UiButton theme="primary" size="big">Кнопка primary</UiButton>
        <UiButton theme="outline" size="big">Кнопка outline</UiButton>
        <UiButton theme="danger" size="big">Кнопка danger</UiButton>
        <UiButton theme="success" size="big">Кнопка success</UiButton>
        <UiButton theme="clear" size="big">Кнопка clear</UiButton>
      </div>
      <div class="btns">
        <UiButton theme="primary">Кнопка primary</UiButton>
        <UiButton theme="outline">Кнопка outline</UiButton>
        <UiButton theme="danger">Кнопка danger</UiButton>
        <UiButton theme="success">Кнопка success</UiButton>
        <UiButton theme="clear">Кнопка clear</UiButton>
      </div>
      <div class="btns">
        <UiButton theme="primary" size="small">Кнопка primary</UiButton>
        <UiButton theme="outline" size="small">Кнопка outline</UiButton>
        <UiButton theme="danger" size="small">Кнопка danger</UiButton>
        <UiButton theme="success" size="small">Кнопка success</UiButton>
        <UiButton theme="clear" size="small">Кнопка clear</UiButton>
      </div>
      <div class="btns">
        <UiButton theme="primary" iconLeft="calendar">Кнопка primary</UiButton>
        <UiButton theme="outline" iconLeft="plus">Кнопка outline</UiButton>
        <UiButton theme="danger" iconLeft="support">Кнопка danger</UiButton>
        <UiButton theme="success" iconLeft="plus" iconRight="user">Кнопка success</UiButton>
        <UiButton theme="clear" iconRight="archive:24">Кнопка clear</UiButton>
      </div>
      <p class>
        Можно задавать иконки через iconLeft и/или iconRight. Принимает модификатор через двоеточие.
        Например caret:8 - модификатор выосты иконки
      </p>
    </div>
  </DashboardTemplate>
</template>

<script>
export default {
  data: () => ({
    pagination: {
      current: 1,
      total: 30,
    },
    date: new Date(),
    icons: [
      "archive",
      "arrow-back",
      "calendar",
      "caret",
      "check",
      "copy",
      "dashboard",
      "document",
      "dots",
      "filter",
      "folder",
      "grid-view",
      "layers",
      "logo",
      "pause",
      "plus",
      "report",
      "rouble",
      "support",
      "time",
      "user",
    ],
  }),
}
</script>

<style scoped lang="scss">
.section {
  padding-bottom: 32px;
  margin-bottom: 32px;
  border-bottom: 1px solid $colorAccent;
  &:last-child {
    border-bottom: 0;
  }
}
.title {
  margin-bottom: 32px !important ;
}
.icons {
  display: flex;
  flex-wrap: wrap;
  color: $fontColor;
  font-size: 2.2em;
  max-width: 600px;
  margin-top: 32px;
  margin-bottom: -16px;
  color: rgba($fontColor, 0.8);
  .ico {
    flex: 0 0 120px;
    margin-right: 16px;
    margin-bottom: 16px;
    .c-accent {
      font-size: 14px;
      margin-top: 8px;
    }
  }
}

.inputs {
  max-width: 400px;
  .input {
    margin-top: 16px;
  }
}

.btns {
  margin-top: 32px;
  .button {
    margin-right: 16px;
    margin-bottom: 16px;
  }
}
</style>
