<template>
  <div class="panel">
    <div class="panel__content">
      <div class="panel__scroller">
        <DashboardHead
          @onCreateBtnClick="() => null"
          createBtnText="Создать Группу"
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
          :rows="groupAds"
          :selectedRows="selectedRows"
          :allSelected="allSelected"
          @onSelectAll="handleSelectAll"
          @onSelect="handleSelect"
        />
        <DashboardGrid
          v-if="filterView === 'grid'"
          :selectable="true"
          :columns="columns"
          :rows="groupAds"
          :selectedRows="selectedRows"
          :allSelected="allSelected"
          @onSelect="handleSelect"
        />
      </div>
    </div>
    <div class="panel__pagination" v-if="groupAds && groupAds.length">
      <UiPagination :meta="groupAdsPagination" @onChange="paginationSelect" />
    </div>

    <div class="loader" :class="[loading && 'is-active']">
      <UiLoader theme="block" :loading="loading" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { tableSelectAll } from "@/mixins"
import { columns } from "./mockData"
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

    await this.getGroupAds()

    this.loading = false
  },
  computed: {
    selectedCount() {
      return this.selectedRows.length
    },
    ...mapGetters("ads", ["filterView", "groupAds", "groupAdsPagination"]),
  },
  methods: {
    handlePauseClick() {
      console.log(this.toast)
      this.toast.success("Succes notification test")
    },
    handleCopyClick() {
      this.toast.error("Error notification test")
    },
    async paginationSelect(page) {
      this.loading = true

      await this.getGroupAds({ page, limit: 15 })

      this.loading = false
    },
    ...mapActions("ads", ["getGroupAds"]),
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
