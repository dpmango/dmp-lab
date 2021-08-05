<template>
  <table class="table">
    <thead>
      <th v-if="selectable" class="selectable">
        <UiCheckbox :value="selectAll" @onChange="(v) => (selectAll = v)" />
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
          <UiCheckbox />
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
export default {
  data() {
    return {
      selectAll: false,
    }
  },
  props: {
    selectable: Boolean,
    columns: Array,
    rows: Array,
  },
}
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
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
  }
  th,
  td {
    &.align-center {
      text-align: center;
    }
    &.selectable {
      padding-left: 16px;
      padding-right: 16px;
    }
    &.toggle {
      padding-left: 6px;
      padding-right: 6px;
      width: 48px;
    }
  }
}

.status {
}
</style>
