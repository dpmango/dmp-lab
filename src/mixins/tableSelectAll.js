import isEqual from "lodash/isEqual"

export default {
  data() {
    return {
      selectedRows: [],
      allSelected: false,
    }
  },
  methods: {
    handleSelectAll() {
      const rowsIds = this.rows.map((x) => x.id)

      if (!isEqual(this.selectedRows, rowsIds)) {
        this.selectedRows = rowsIds
      } else {
        this.selectedRows = []
      }
    },
    handleSelect(id) {
      if (this.selectedRows.includes(id)) {
        this.selectedRows = [...this.selectedRows.filter((x) => x !== id)]
      } else {
        this.selectedRows = [...this.selectedRows, ...[id]]
      }
    },
  },
  watch: {
    selectedRows(val) {
      const rowsIds = this.rows.map((x) => x.id)

      this.allSelected = isEqual(val, rowsIds)
    },
  },
}
