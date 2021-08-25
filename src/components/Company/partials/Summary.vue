<template>
  <div class="summary">
    <div class="summary__label">Суточный лимит</div>
    <div class="summary__value" :class="!data.limit && 'disabled'">
      {{ data.limit || "не указан" }}
    </div>
  </div>
  <div class="summary">
    <div class="summary__label">Общий лимит</div>
    <div class="summary__value" :class="!data.limitTotal && 'disabled'">
      {{ data.limitTotal || "не указан" }}
    </div>
  </div>
  <div class="summary">
    <div class="summary__label">Ставка</div>
    <div class="summary__value">{{ data.pricePoint }}</div>
  </div>
  <div class="summary">
    <div class="summary__label">Стратегия</div>
    <div class="summary__value">{{ data.strategy }}</div>
  </div>
  <div class="summary">
    <div class="summary__label">Распределение</div>
    <div class="summary__value">{{ data.allocation }}</div>
  </div>
  <div class="summary">
    <div class="summary__label">Период</div>
    <div class="summary__value" :class="!data.period && 'disabled'">
      {{ data.period || "не указан" }}
    </div>
  </div>
  <div class="summary">
    <div class="summary__label">Частота показов</div>
    <div class="summary__value" :class="!data.frequencyHours && 'disabled'">
      {{ data.frequencyTimes }} {{ data.frequencyHours || "не указан" }}
    </div>
  </div>
</template>

<script>
import { Plurize, convertDayNameToMini } from "@/utils"

export default {
  props: [
    "limit",
    "limitTotal",
    "limitTypeId",
    "frequencyTimes",
    "frequencyHours",
    "showTimes",
    "strategyByView",
    "allocationTypeOptions",
    "allocationTypeId",
  ],
  computed: {
    getLimitPLural() {
      switch (this.limitTypeId) {
        case 1:
          return ["рубль", "рубля", "рублей"]
        case 2:
          return ["клик", "клика", "кликов"]
        case 3:
          return ["показ", "показа", "показов"]
        default:
          return null
      }
    },
    data() {
      const limitPlural = Plurize(parseInt(this.limit), ...this.getLimitPLural)
      const limitTotalPlural = Plurize(parseInt(this.limitTotal), ...this.getLimitPLural)
      const frequencyTimesPlural = Plurize(
        parseInt(this.frequencyTimes),
        "показа",
        "показов",
        "показов"
      )
      const frequencyHoursPlural = Plurize(parseInt(this.frequencyHours), "час", "часа", "часов")

      const limit = this.limit && `${this.limit} ${limitPlural}`
      const limitTotal = this.limitTotal && `${this.limitTotal} ${limitTotalPlural}`
      const strategy = this.strategyByView ? "CPM" : "CPC"
      const allocation = this.allocationTypeOptions.find((x) => x.id === this.allocationTypeId)
      const period = this.showTimes.reduce((acc, x) => {
        return `${acc}${convertDayNameToMini(x.day)}: ${x.times.join(", ")} `
      }, "")
      const frequencyTimes =
        this.frequencyTimes && `Не более ${this.frequencyTimes} ${frequencyTimesPlural}`
      const frequencyHours =
        this.frequencyHours && `в ${this.frequencyHours} ${frequencyHoursPlural}`

      return {
        limit,
        limitTotal,
        pricePoint: "20 Р", // TODO - static value for now
        strategy,
        allocation: allocation && allocation.label,
        period,
        frequencyTimes,
        frequencyHours,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.summary {
  display: flex;
  align-items: center;
  margin-top: -8px;
  font-size: 16px;
  & + & {
    margin-top: 16px;
  }
  &__label {
    color: $colorGray;
    padding-right: 24px;
  }
  &__value {
    margin-left: auto;
    font-weight: 600;
    text-align: right;
    &.disabled {
      color: $colorGray;
      font-weight: 400;
    }
  }
}

@include r($hd) {
  .summary {
    font-size: 14px;
    margin-top: 0px;
    & + & {
      margin-top: 20px;
    }
  }
}
</style>
