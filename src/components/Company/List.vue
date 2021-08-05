<template>
  <div class="panel">
    <DashboardHead
      @onCreateBtnClick="() => null"
      createBtnText="Создать Компанию"
      @onPauseClick="handlePauseClick"
      @onCopyClick="handleCopyClick"
    />

    <div class="panel__content">
      <DashboardTable :selectable="true" :columns="columns" :rows="rows" />
    </div>
    <div class="panel__pagination">
      <UiPagination :meta="pagination" @onChange="paginationSelect" />
    </div>
  </div>
</template>

<script>
import { columns, rows } from "./mockData"
import { useToast } from "vue-toastification"

export default {
  setup() {
    const toast = useToast()

    return { toast }
  },
  data() {
    return {
      columns: columns,
      rows: rows,
      selectedRows: [],
      pagination: {
        current: 1,
        total: 3,
      },
    }
  },
  methods: {
    handlePauseClick() {
      console.log(this.toast)
      this.toast.success("Succes notification test")
    },
    handleCopyClick() {
      this.toast.error("Error notification test")
    },
    paginationSelect(page) {
      this.pagination.current = page
    },
  },
}
</script>

<style scoped lang="scss">
.panel {
  margin-top: 36px;
  &__head {
    padding: 16px 24px 16px 16px;
    background: #ffffff;
  }
  &__content {
    background: #ffffff;
  }
  &__pagination {
    margin-top: 26px;
  }
}

.head {
  display: flex;
  align-items: center;
  &__create {
    flex: 0 0 auto;
  }
  &__actions {
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
