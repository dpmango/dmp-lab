<template>
  <div class="header">
    <div class="header__wrapper">
      <div
        class="header__hamburger hamburger hamburger--squeeze"
        :class="[sidebarOpened && 'is-active']"
        @click="toggleHamburger"
      >
        <div class="hamburger-box">
          <div class="hamburger-inner"></div>
        </div>
      </div>
      <div class="header__logo">
        <SvgIcon name="logo" />
      </div>
      <div class="header__menu">
        <ul class="header__menu-list">
          <li>
            <router-link to="/">Начало работы</router-link>
          </li>
          <!-- <li>
            <router-link to="/">Новости</router-link>
          </li> -->
          <li>
            <router-link to="/support">Задать вопрос</router-link>
          </li>
          <!-- <li>
            <router-link to="/">Сотрудничество</router-link>
          </li> -->
          <li>
            <router-link to="/ui">Интерфейс</router-link>
          </li>
        </ul>
      </div>
      <div class="header__actions">
        <div class="header__balance">
          <div class="header__balance-val">
            <SvgIcon name="rouble" />
            <span>2 580</span>
          </div>
          <div class="header__balance-action">
            <SvgIcon name="plus" />
          </div>
        </div>
        <div class="header__user" v-click-outside="closeUserMenu">
          <div class="header__user-toggle" @click.stop="toggleUserMenu">
            <div class="header__user-avatar">
              <img src="https://randomuser.me/portraits/men/3.jpg" alt="John Capusta" />
            </div>
            <div class="header__user-caret">
              <SvgIcon name="caret" />
            </div>
          </div>
          <div class="header__user-context" :class="[userMenuOpened && 'active']">
            <ul class="header__user-menu">
              <li>
                <router-link to="/profile">Профиль</router-link>
              </li>
              <li>
                <a href="#" @click="logout">Выйти </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"

export default {
  data: () => ({
    userMenuOpened: false,
  }),
  computed: {
    ...mapState("ui", ["sidebarOpened"]),
  },
  methods: {
    toggleHamburger() {
      this.setSidebar(!this.sidebarOpened)
    },
    closeUserMenu() {
      this.userMenuOpened = false
    },
    toggleUserMenu() {
      this.userMenuOpened = !this.userMenuOpened
    },

    ...mapMutations("ui", ["setSidebar"]),
    ...mapActions("auth", ["logout"]),
  },
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background: $colorPrimary;
  color: white;
  transform: translate3d(0, 0, 0);
  &__wrapper {
    display: flex;
    align-items: center;
    padding: 26px 56px;
  }
  &__hamburger {
    flex: 0 0 auto;
    display: none;
    transform: translateY(3px);
    transition: opacity 0.25s $ease;
    &:hover {
      opacity: 0.7;
    }
  }
  &__logo {
    flex: 0 0 auto;
    font-size: 0;
    .svg-icon {
      font-size: 36px;
    }
  }
  &__menu {
    flex: 0 1 auto;
    margin-left: 160px;
  }
  &__menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    margin-left: -10px;
    margin-right: -10px;
    li {
      flex: 0 1 auto;
      display: inline-block;
      margin-right: 30px;
      font-weight: 600;
      font-size: 16px;
      line-height: (20 / 16);
      letter-spacing: -0.03em;
      &:last-child {
        margin-right: 0;
      }
    }
    a {
      display: inline-block;
      padding: 10px;
      position: relative;
      transition: color 0.25s $ease;
      &:hover {
        color: rgba(white, 0.8);
      }
    }
  }

  &__actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }
  &__balance {
    display: flex;
    align-items: center;
    background: #f1754f;
    border-radius: 14px;
    padding: 8px 8px 8px 16px;
    min-width: 150px;
    cursor: pointer;
    transition: background 0.25s $ease;
    &:hover {
      background: rgba($fontColor, 0.2);
    }
  }
  &__balance-val {
    padding-right: 12px;
    font-weight: bold;
    font-size: 16px;
    .svg-icon {
      opacity: 0.6;
      font-size: 12px;
      margin-right: 4px;
    }
  }
  &__balance-action {
    flex: 0 0 auto;
    margin-left: auto;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: $colorPrimary;
    border-radius: 8px;
    font-size: 0;
    .svg-icon {
      font-size: 10px;
    }
  }
  &__user {
    margin-left: 52px;
    position: relative;
    z-index: 1;
  }
  &__user-toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      .header {
        &__user-caret {
          color: white;
        }
      }
    }
  }
  &__user-avatar {
    position: relative;
    z-index: 1;
    width: 48px;
    height: 48px;
    overflow: hidden;
    border-radius: 50%;
    background: $colorBg;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__user-caret {
    margin-left: 12px;
    font-size: 0;
    color: rgba(white, 0.6);
    transition: color 0.25s $ease;
    .svg-icon {
      font-size: 8px;
    }
  }
  &__user-context {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 2;
    overflow: hidden;
    background: white;
    border-radius: 8px;
    color: $fontColor;
    box-shadow: 0px 20px 18px rgba(11, 14, 87, 0.12);
    opacity: 0;
    pointer-events: none;
    transform: translate(0, 7px);
    will-change: transform;
    transition: 0.25s $ease;
    &.active {
      opacity: 1;
      pointer-events: all;
      transform: none;
    }
  }
  &__user-menu {
    list-style: none;
    margin: 0px 0;
    padding: 0;
    li {
      display: block;
      font-size: 14px;
    }
    a {
      display: block;
      padding: 8px 16px;
      transition: background 0.25s $ease, color 0.25s $ease;
      &:hover {
        background: $colorBg;
      }
    }
  }
}

@include r($hd) {
  .header {
    &__logo {
      .svg-icon {
        font-size: 32px;
      }
    }
    &__menu {
      margin-left: 105px;
    }
  }
}

@include r($xl) {
  .header {
    &__wrapper {
      padding: 9px 20px;
    }
    &__hamburger {
      margin-right: 16px;
    }
    &__logo {
      .svg-icon {
        font-size: 29px;
      }
    }
    &__menu {
      margin-left: 110px;
    }
    &__balance {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    &__user-avatar {
      width: 42px;
      height: 42px;
    }
  }
}

@include r($md) {
  .header {
    &__hamburger {
      display: block;
    }
  }
}
</style>
