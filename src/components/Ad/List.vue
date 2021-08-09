<template>
  <div class="panel">
    <DashboardHead
      @onCreateBtnClick="() => null"
      createBtnText="Создать Объявление"
      :allSelected="allSelected"
      :selectedCount="selectedCount"
      @onPauseClick="handlePauseClick"
      @onCopyClick="handleCopyClick"
      @onSelectAll="handleSelectAll"
    />

    <div class="panel__content">
      <DashboardTable
        :selectable="true"
        :columns="columns"
        :rows="rows"
        :selectedRows="selectedRows"
        :allSelected="allSelected"
        @onSelectAll="handleSelectAll"
        @onSelect="handleSelect"
      />
    </div>
    <div class="panel__pagination">
      <UiPagination :meta="pagination" @onChange="paginationSelect" />
    </div>
  </div>
</template>

<script>
import tableSelectAll from "@/mixins/tableSelectAll"
import { columns, rows } from "./mockData"
import { useToast } from "vue-toastification"

export default {
  mixins: [tableSelectAll],
  setup() {
    const toast = useToast()

    return { toast }
  },
  data() {
    return {
      view: "list",
      columns: columns,
      rows: rows,
      selectedRows: [],
      pagination: {
        current: 1,
        total: 30,
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
  &__content {
    background: #ffffff;
  }
  &__pagination {
    margin-top: 26px;
  }
}
</style>
