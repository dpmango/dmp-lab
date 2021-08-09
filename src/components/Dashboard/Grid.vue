<template>
  <div class="grid">
    <div class="row">
      <div class="col col-3 col-hd-4 col-md-6 col-sm-12" v-for="row in rows" :key="row.id">
        <div class="card">
          <div class="card__head">
            <div class="card__head-main">
              <div class="card__head-icon">
                <SvgIcon name="play" />
              </div>
              <div class="card__head-date">20 мая 2021</div>
              <div class="card__head-status">
                <StatusBadge :status="row.list[2].content" />
              </div>
            </div>

            <div class="card__title-row">
              <UiCheckbox
                :value="selectedRows.includes(row.id)"
                @onChange="(v) => $emit('onSelect', row.id)"
              />
              <div class="card__title">{{ row.list[0].content }}</div>
            </div>
          </div>
          <div class="card__content">
            <div class="card__row" v-for="(td, idx) in rowedColumns" :key="idx">
              <div class="card__row-label">{{ td.label }}</div>
              <div class="card__row-value" v-if="row.list[idx + 3]">
                {{ row.list[idx + 3].content }}
              </div>
            </div>
          </div>
          <div class="card__actions">
            <UiToggle :value="row.active" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  computed: {
    rowedColumns() {
      return this.columns.slice(3, this.columns.length)
    },
  },
}
</script>

<style scoped lang="scss">
.grid {
  margin-top: 24px;
}

.card {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  &__head {
    padding: 32px 24px 24px;
  }
  &__head-main {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__head-icon {
    margin-right: 6px;
    font-size: 0;
    color: $colorGreen;
    .svg-icon {
      font-size: 14px;
    }
  }
  &__head-date {
    margin-right: 24px;
  }
  // &__head-status{}
  &__title-row {
    margin-top: 18px;
    display: flex;
    align-items: center;
  }
  &__title {
    margin-left: 8px;
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
  }
  &__content {
    margin-top: auto;
    padding: 18px 24px;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }
  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 13px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__row-label {
    padding-right: 12px;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: $colorGray;
  }
  &__row-value {
    margin-left: auto;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: right;
    letter-spacing: -0.01em;
  }

  &__actions {
    padding: 16px 24px;
    display: flex;
    align-items: center;
  }
}

@include r($hd) {
  .card {
    &__title {
      font-size: 16px;
    }
    &__row-label {
      font-size: 16px;
    }
    &__row-value {
      font-size: 18px;
    }
  }
}
</style>
