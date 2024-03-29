<template>
  <table class="table">
    <thead>
      <th v-if="selectable" class="selectable">
        <UiCheckbox :value="allSelected" @onChange="(v) => $emit('onSelectAll')" />
      </th>
      <th class="toggle"></th>
      <th
        v-for="th in columns"
        :key="th.label"
        :class="[{ sortable: th.sortable }, th.align && `align-${th.align}`]"
      >
        {{ th.label }}
      </th>
    </thead>
    <tbody>
      <tr v-for="tr in rows" :key="tr.id">
        <td v-if="selectable" class="selectable">
          <UiCheckbox
            :value="selectedRows.includes(tr.id)"
            @onChange="(v) => $emit('onSelect', tr.id)"
          />
        </td>
        <td class="toggle">
          <UiToggle :value="tr.active" />
        </td>
        <td
          v-for="(td, idx) in tr.list"
          :class="[columns[idx].align && `align-${columns[idx].align}`]"
          :key="idx"
        >
          <template v-if="td.type === 'number'">{{ td.content }}</template>
          <template v-else-if="td.type === 'date'">{{ getTimeStamp(td.content) }}</template>
          <template v-else-if="td.type === 'status'">
            <StatusBadge :status="td.content" />
          </template>
          <template v-else>{{ td.content }}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import djs from "dayjs"

export default {
  props: {
    selectable: Boolean,
    columns: Array,
    rows: Array,
    allSelected: Boolean,
    selectedRows: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getTimeStamp(d) {
      return djs(d).format("DD.MM.YYYY")
    },
  },
}
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  th {
    font-weight: 600;
    font-size: 14px;
    line-height: 1.5;
    color: $colorGray;
    padding: 12px;
    border-top: 1px solid #ececec;
    text-align: left;
  }
  tbody {
    tr:hover {
      td {
        background: #f7f8f9;
      }
    }
  }
  td {
    font-size: 14px;
    line-height: 1.5;
    padding: 21px 12px;
    border-top: 1px solid #ececec;
    vertical-align: center;
    transition: background 0.1s $ease;
    .badge {
      white-space: nowrap;
    }
  }
  th,
  td {
    &.align-center {
      text-align: center;
    }
    &.selectable {
      padding-left: 16px;
      padding-right: 16px;
      width: 48px;
    }
    &.toggle {
      padding-left: 6px;
      padding-right: 6px;
      width: 48px;
    }
  }
}

@include r($lg) {
  .table {
    th,
    td {
      padding-left: 8px;
      padding-right: 8px;
    }
  }
}
</style>
