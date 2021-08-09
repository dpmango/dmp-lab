<template>
  <div class="tabs">
    <div class="row">
      <div class="col col-4">
        <div class="tab" :class="[activeTab === 1 && 'active']" @click="$emit('onTabChange', 1)">
          <div class="tab__title">
            <div class="tab__icon">
              <SvgIcon name="folder" />
            </div>
            <div class="tab__name">Кампании</div>
          </div>
          <div class="tab__meta">0 выбрано</div>
        </div>
      </div>
      <div class="col col-4">
        <div class="tab" :class="[activeTab === 2 && 'active']" @click="$emit('onTabChange', 2)">
          <div class="tab__title">
            <div class="tab__icon">
              <SvgIcon name="layers" />
            </div>
            <div class="tab__name">Группы объявлений</div>
          </div>
          <div class="tab__meta">0 выбрано</div>
        </div>
      </div>
      <div class="col col-4">
        <div class="tab" :class="[activeTab === 3 && 'active']" @click="$emit('onTabChange', 3)">
          <div class="tab__title">
            <div class="tab__icon">
              <SvgIcon name="document" />
            </div>
            <div class="tab__name">Объявления</div>
          </div>
          <div class="tab__meta">0 выбрано</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeTab: Number,
  },
}
</script>

<style scoped lang="scss">
.tabs {
  position: relative;
}

.tab {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  padding: 24px;
  cursor: pointer;
  transition: background 0.25s $ease, border 0.25s $ease;
  &::after {
    display: inline-block;
    content: " ";
    position: absolute;
    bottom: -12px;
    left: 24px;
    width: 24px;
    height: 24px;
    background: #ffffff;
    transform: translateY(-12px) rotate(-45deg);
    opacity: 0;
    transition: opacity 0.25s $ease, transform 0.25s $ease;
    will-change: transform;
  }
  &__title {
    position: relative;
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    &::before {
      display: inline-block;
      content: " ";
      position: absolute;
      top: -24px;
      left: 0;
      right: 100%;
      height: 2px;
      pointer-events: none;
      background: $colorPrimary;
      transition: right 0.25s $ease;
    }
  }
  &__icon {
    color: #dadada;
    flex: 0 0 auto;
    font-size: 0;
    margin-right: 8px;
    .svg-icon {
      font-size: 16px;
    }
  }
  &__name {
    font-weight: 600;
    font-size: 18px;
  }
  &__meta {
    margin-left: auto;
    font-size: 14px;
    color: $colorGray;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s $ease;
  }
  &:hover {
    background: rgba(white, 0.5);
  }
  &.active {
    border-color: transparent;
    background: white;
    &::after {
      opacity: 1;
      transform: rotate(-45deg);
    }
    .tab {
      &__title {
        &::before {
          right: 0;
        }
      }
      &__meta {
        opacity: 1;
        pointer-events: all;
      }
    }
  }
}

@include r($hd) {
  .tab {
    &__name {
      font-size: 16px;
    }
  }
}
</style>
