<template>
  <div class="panel">
    <div class="panel__content">
      <div class="panel__scroller">
        <DashboardHead
          @onCreateBtnClick="() => null"
          createBtnText="Создать Объявление"
          :allSelected="allSelected"
          :selectedCount="selectedCount"
          @onPauseClick="handlePauseClick"
          @onCopyClick="handleCopyClick"
          @onSelectAll="handleSelectAll"
        />

        <DashboardTable
          v-if="filterView === 'list'"
          :selectable="true"
          :columns="columns"
          :rows="rows"
          :selectedRows="selectedRows"
          :allSelected="allSelected"
          @onSelectAll="handleSelectAll"
          @onSelect="handleSelect"
        />
        <DashboardGrid
          v-if="filterView === 'grid'"
          :selectable="true"
          :columns="columns"
          :rows="rows"
          :selectedRows="selectedRows"
          :allSelected="allSelected"
          @onSelect="handleSelect"
        />
      </div>
    </div>
    <div class="panel__pagination">
      <UiPagination :meta="pagination" @onChange="paginationSelect" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { tableSelectAll } from "@/mixins"
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
      columns: columns,
      rows: rows,
      selectedRows: [],
      pagination: {
        current: 1,
        total: 30,
      },
    }
  },
  computed: {
    selectedCount() {
      return this.selectedRows.length
    },
    ...mapGetters("ads", ["filterView"]),
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
    position: relative;
    min-width: 1px;
    overflow-x: auto;
  }
  &__scroller {
    min-width: 1000px;
  }
  &__pagination {
    margin-top: 26px;
  }
}

@include r($hd) {
  .panel {
    margin-top: 24px;
  }
}
</style>
