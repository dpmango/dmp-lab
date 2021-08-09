<template>
  <div class="head">
    <div class="head__create">
      <CreateBtn @click="$emit('onCreateBtnClick')">{{ createBtnText }}</CreateBtn>
    </div>
    <div class="head__actions">
      <UiButton theme="clear" size="small" @click="$emit('onSelectAll')">
        <UiCheckbox :value="allSelected" />
        <span class="c-gray">&nbsp;&nbsp;{{ selectedCount }}</span>
        <span>&nbsp;&nbsp;Выделить все</span>
      </UiButton>
      <UiButton theme="clear" size="small" iconLeft="pause" @click="$emit('onPauseClick')">
        Остановить
      </UiButton>
      <UiButton theme="clear" size="small" iconLeft="copy" @click="$emit('onCopyClick')">
        Дублировать
      </UiButton>
    </div>
    <div class="head__calendar">
      <DatePicker v-model="date" :columns="$screens({ default: 1, lg: 2 })" is-range>
        <template v-slot="{ inputValue, togglePopover }">
          <UiButton
            theme="clear"
            size="small"
            iconLeft="calendar"
            iconRight="caret:8"
            @click="togglePopover"
          >
            <span> {{ inputValue.start }} - {{ inputValue.end }}</span>
          </UiButton>
        </template>
      </DatePicker>
    </div>
    <div
      class="head__view"
      @click="handleViewClick"
      :class="[filterView === 'grid' && 'is-grid-view']"
    >
      <SvgIcon name="grid-view" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex"

export default {
  props: {
    createBtnText: String,
    selectedCount: Number,
    allSelected: Boolean,
  },
  data() {
    return {}
  },
  computed: {
    date: {
      get() {
        return this.filterDate
      },
      set(v) {
        this.setFilterDate(v)
      },
    },
    ...mapGetters("ads", ["filterView", "filterDate"]),
  },
  methods: {
    handleViewClick() {
      this.setFilterView(this.filterView === "list" ? "grid" : "list")
    },
    ...mapMutations("ads", ["setFilterView", "setFilterDate"]),
  },
}
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  align-items: center;
  padding: 16px 24px 16px 16px;
  background: #ffffff;
  &__create {
    flex: 0 0 auto;
  }
  &__actions {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }
  &__calendar {
    margin-left: auto;
  }
  &__view {
    font-size: 0;
    margin-left: 14px;
    color: #dadada;
    cursor: pointer;
    transition: color 0.25s $ease;
    .svg-icon {
      font-size: 24px;
    }
    &:hover {
      color: rgba($colorPrimary, 0.5);
    }
    &.is-grid-view {
      color: $colorPrimary;
    }
  }
}
</style>
