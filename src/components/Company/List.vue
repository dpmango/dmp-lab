<template>
  <div class="panel">
    <div class="panel__content">
      <div class="panel__scroller">
        <DashboardHead
          @onCreateBtnClick="$router.push('/company/create')"
          createBtnText="Создать Компанию"
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
    <div class="panel__pagination" v-if="rows && rows.length">
      <UiPagination :meta="compaingsPagination" @onChange="paginationSelect" />
    </div>

    <div class="loader" :class="[loading && 'is-active']">
      <UiLoader theme="block" :loading="loading" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
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
      selectedRows: [],
      loading: true,
    }
  },
  async created() {
    this.loading = true

    await this.getCompaings()

    this.loading = false
  },
  computed: {
    selectedCount() {
      return this.selectedRows.length
    },
    rows() {
      return this.compaings
    },
    ...mapGetters("ads", ["filterView", "compaings", "compaingsPagination"]),
  },
  methods: {
    async handlePauseClick() {
      await this.stopCompaigns({ campaignIds: this.selectedRows })
        .then((res) => {
          this.toast.success("Успешно остановлено")
        })
        .catch((err) => {
          this.toast.error("Ошибка при остановке")
        })
    },
    handleCopyClick() {
      // this.toast.error("Error notification test")
    },
    async paginationSelect(page) {
      this.loading = true

      await this.getCompaings({ page, limit: 15 })

      this.loading = false
    },
    ...mapActions("ads", ["getCompaings", "stopCompaigns"]),
  },
}
</script>

<style scoped lang="scss">
.panel {
  position: relative;
  margin-top: 36px;
  &__head {
    padding: 16px 24px 16px 16px;
    background: #ffffff;
  }
  &__content {
    position: relative;
    min-width: 1px;
    overflow-x: auto;
    overflow-y: hidden;
  }
  &__scroller {
    min-width: 1000px;
  }
  &__pagination {
    margin-top: 26px;
  }
}

.loader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(white, 0.5);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s $ease;
  &.is-active {
    opacity: 1;
    pointer-events: all;
  }
}

@include r($hd) {
  .panel {
    margin-top: 24px;
  }
}
</style>
