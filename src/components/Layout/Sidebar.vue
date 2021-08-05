<template>
  <div class="sidebar">
    <ul class="sidebar__menu">
      <li>
        <router-link to="/dashboard" class="link">
          <i class="link__icon">
            <SvgIcon name="dashboard" />
          </i>
          <span class="link__text">Дашборд</span>
        </router-link>
      </li>
      <!-- <li>
        <router-link to="/" class="link">
          <i class="link__icon">
            <SvgIcon name="archive" />
          </i>
          <span class="link__text">Архив Компаний</span>
        </router-link>
      </li>
      <li>
        <router-link to="/" class="link">
          <i class="link__icon">
            <SvgIcon name="report" />
          </i>
          <span class="link__text">Отчеты</span>
        </router-link>
      </li>
      <li>
        <router-link to="/" class="link">
          <i class="link__icon">
            <SvgIcon name="user" />
          </i>
          <span class="link__text">Пользователи</span>
        </router-link>
      </li> -->
    </ul>

    <div class="sidebar__bottom">
      <router-link to="/support" class="link">
        <i class="link__icon">
          <SvgIcon name="support" />
        </i>
        <span class="link__text">ТЕХПОДДЕРЖКА</span>
      </router-link>

      <div class="sidebar__copy">
        <span>Copyright © 2010-2021 DMP-LAB.</span> Все права защищены.
      </div>
      <a href="mailto:hello@dmp-lab.ru" class="sidebar__email">hello@dmp-lab.ru</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  padding: 40px 20px 20px 56px;
  padding-right: 20px;
  overflow-y: auto;
  &__menu {
    list-style: none;
    margin: 0;
    padding: 0px 0;
    li {
      display: block;
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &__bottom {
    flex: 0 0 auto;
    margin-top: auto;
  }
  &__copy {
    margin-top: 24px;
    font-size: 12px;
    line-height: 1.4;
    color: $colorGray;
    span {
      display: block;
      font-weight: 500;
    }
  }
  &__email {
    margin-top: 8px;
    font-size: 12px;
    line-height: 1.4;
    font-weight: 500;
    text-decoration-line: underline;
    transition: color 0.25s $ease;
    &:hover {
      color: $colorPrimaryHover;
      text-decoration: none;
    }
  }
}

.link {
  display: flex;
  align-items: center;
  padding: 8px 0;
  &__icon {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 42px;
    height: 42px;
    background: $colorBg;
    border-radius: 14px;
    color: $colorAccent;
    font-size: 0;
    transition: background 0.25s $ease, box-shadow 0.25s $ease, color 0.25s $ease;
    .svg-icon {
      font-size: 16px;
    }
  }
  &__text {
    display: inline-block;
    margin-left: 16px;
    font-weight: bold;
    font-size: 14px;
    line-height: (17 / 14);
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  &:hover,
  &.router-link-active {
    .link__icon {
      color: white;
      background: $colorPrimary;
      box-shadow: 0px 12px 16px rgba(199, 68, 27, 0.2);
    }
  }
}

@include r($hd) {
  .link {
    &__icon {
      width: 36px;
      height: 36px;
    }
    &__text {
      font-size: 12px;
    }
  }
}
</style>
