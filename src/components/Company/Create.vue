<template>
  <div class="create">
    <UiBreadcrumbs :list="crumbs" />

    <Form ref="form" as="form" class="create__content" @submit="handleSubmit">
      <div class="row create__main-row">
        <div class="col col-8">
          <div class="panel">
            <h3 class="panel__title h3-title">Название кампании</h3>
            <div class="panel__section">
              <UiError :error="error" />

              <Field
                v-model="name"
                name="name"
                v-slot="{ errorMessage, field }"
                rules="required|max:150"
              >
                <UiInput
                  theme="dynamic"
                  label="Введите название"
                  helper="Название не должно превышать 150 символов."
                  :error="errorMessage"
                  v-bind="field"
                />
              </Field>
            </div>
          </div>

          <!-- next panel -->
          <div class="panel">
            <h3 class="panel__title h3-title">Бюджеты и лимиты</h3>
            <div class="panel__section">
              <div class="h5-title">Укажите лимит</div>
              <div class="limits mt-1">
                <div class="row">
                  <div class="col col-4">
                    <UiRadioGroup
                      label="Выберите тип"
                      :activeId="limitTypeId"
                      :options="limitTypeOptions"
                      @onChange="(id) => (limitTypeId = id)"
                    />
                  </div>
                  <div class="col col-4">
                    <Field
                      v-model="limit"
                      name="limit"
                      v-slot="{ errorMessage, field }"
                      rules="required"
                    >
                      <UiNumberInput
                        label="Установите общий лимит"
                        :helper="getLimitHelperText"
                        :error="errorMessage"
                        v-bind="field"
                      />
                    </Field>
                  </div>
                  <div class="col col-4">
                    <Field
                      v-model="limitTotal"
                      name="limitTotal"
                      v-slot="{ errorMessage, field }"
                      rules="required"
                    >
                      <UiNumberInput
                        label="Установите лимит"
                        :helper="getLimitHelperText"
                        :error="errorMessage"
                        v-bind="field"
                      />
                    </Field>
                  </div>
                </div>
              </div>
            </div>

            <!-- next section -->
            <div class="panel__section">
              <div class="h5-title">Распределение бюджета</div>
              <div class="allocation mt-1">
                <UiRadioGroup
                  theme="detailed"
                  :activeId="allocationTypeId"
                  :options="allocationTypeOptions"
                  @onChange="(id) => (allocationTypeId = id)"
                />
              </div>
            </div>

            <!-- next section -->
            <div class="panel__section">
              <div class="h5-title">Стратегия закупки</div>

              <div class="strategy">
                <UiToggle
                  label="Оптимизация по"
                  :options="['Показам', 'Кликам']"
                  theme="withOptions"
                  :value="strategyByView"
                  @onChange="(x) => (strategyByView = !strategyByView)"
                />
              </div>
            </div>

            <!-- next section -->
            <div class="panel__section">
              <div class="h5-title">Старт запуска кампании</div>

              <div class="times">
                <div class="mt-1 mb-1">
                  <UiRadio
                    :value="startType === 'now'"
                    @onChange="startType = 'now'"
                    label="Запустить сейчас"
                    helper="Рекламная кампания запуститься после сохранения."
                  />
                </div>
                <div class="mt-1 mb-1">
                  <UiRadio
                    :value="startType === 'date'"
                    @onChange="startType = 'date'"
                    label="Установить дату и время"
                  />
                </div>

                <div class="row" v-if="startType === 'date'">
                  <div class="col col-6">
                    <DatePicker v-model="date">
                      <template v-slot="{ inputValue, inputEvents }">
                        <UiInput
                          theme="dynamic"
                          label="Укажите дату"
                          icon="calendar"
                          iconPosition="right"
                          :value="inputValue"
                          v-on="inputEvents"
                        />
                      </template>
                    </DatePicker>
                  </div>
                  <div class="col col-6">
                    <DatePicker v-model="time" mode="time">
                      <template v-slot="{ inputValue, inputEvents }">
                        <UiInput
                          theme="dynamic"
                          label="Укажите время"
                          icon="time"
                          iconPosition="right"
                          :value="inputValue"
                          v-on="inputEvents"
                        />
                      </template>
                    </DatePicker>
                  </div>
                </div>
              </div>
            </div>

            <!-- next section -->
            <div class="panel__section">
              <!-- <div class="h5-title">Календарь</div> -->
              <div class="calendar">
                <UiWeeklyCalendar :activeSlots="weeklySlots" @onSelect="handleWeeklySelect" />
              </div>
            </div>

            <!-- next section -->
            <div class="panel__section">
              <div class="h5-title">Частота показов кампании</div>

              <div class="frequency">
                <div class="row">
                  <div class="col col-6">
                    <Field
                      v-model="frequencyTimes"
                      name="frequencyTimes"
                      v-slot="{ errorMessage, field }"
                      rules="required"
                    >
                      <UiNumberInput
                        label="Не более"
                        helper="раз"
                        :error="errorMessage"
                        v-bind="field"
                      />
                    </Field>
                  </div>
                  <div class="col col-6">
                    <Field
                      v-model="frequencyHours"
                      name="frequencyHours"
                      v-slot="{ errorMessage, field }"
                      rules="required"
                    >
                      <UiNumberInput
                        label="В"
                        helper="часов"
                        :error="errorMessage"
                        v-bind="field"
                      />
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col col-4">
          <div class="panel sticky">
            <h3 class="panel__title h3-title">Основные настройки</h3>

            <div class="panel__section">
              <div class="summary">
                <div class="summary__label">Суточный лимит</div>
                <div class="summary__value" :class="!summary.limit && 'disabled'">
                  {{ summary.limit || "не указан" }}
                </div>
              </div>
              <div class="summary">
                <div class="summary__label">Суточный лимит</div>
                <div class="summary__value" :class="!summary.limitTotal && 'disabled'">
                  {{ summary.limitTotal || "не указан" }}
                </div>
              </div>
              <div class="summary">
                <div class="summary__label">Ставка</div>
                <div class="summary__value">{{ summary.pricePoint }}</div>
              </div>
              <div class="summary">
                <div class="summary__label">Стратегия</div>
                <div class="summary__value">{{ summary.strategy }}</div>
              </div>
              <div class="summary">
                <div class="summary__label">Распределение</div>
                <div class="summary__value">{{ summary.allocation }}</div>
              </div>
              <div class="summary">
                <div class="summary__label">Период</div>
                <div class="summary__value" :class="!summary.period && 'disabled'">
                  {{ summary.period || "не указан" }}
                </div>
              </div>
              <div class="summary">
                <div class="summary__label">Частота показов</div>
                <div class="summary__value" :class="!summary.frequencyHours && 'disabled'">
                  {{ summary.frequencyTimes }} {{ summary.frequencyHours || "не указан" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="create__cta">
        <UiButton type="submit">Сохранить и запустить</UiButton>
        <!-- <UiButton theme="outline" type="button">Отменить изменения</UiButton> -->
      </div>
    </Form>
  </div>
</template>

<script>
import { Plurize } from "@/utils"

export default {
  data() {
    return {
      crumbs: [
        { icon: "folder", to: "/profile", title: "Создание кампании", label: "Новая кампания" },
      ],
      error: null,
      name: null,

      limitTypeId: 2,
      limit: null,
      limitTotal: null,

      allocationTypeId: 2,

      strategyByView: false,

      startType: "now",
      date: null,
      time: new Date(),

      weeklySlots: [],

      frequencyTimes: null,
      frequencyHours: null,
    }
  },
  computed: {
    limitTypeOptions() {
      return [
        { id: 1, label: "Бюджет" },
        { id: 2, label: "Клики" },
        { id: 3, label: "Показы" },
      ]
    },
    allocationTypeOptions() {
      return [
        { id: 1, label: "Равномерное", helper: "Показывать объявления равномерно в течение дня" },
        { id: 2, label: "Ускоренное", helper: "Показывать объявления <br/>как можно чаще" },
      ]
    },
    getLimitHelperText() {
      switch (this.limitTypeId) {
        case 1:
          return "рублей"
        case 2:
          return "кликов"
        case 3:
          return "показов"
        default:
          return null
      }
    },
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
    summary() {
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
      const period = null
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
  methods: {
    handleWeeklySelect({ time, day }) {
      const alreadySelected = this.weeklySlots.find(
        (slot) => slot.time === time && slot.day === day
      )

      if (alreadySelected) {
        this.weeklySlots = [
          ...this.weeklySlots.filter((slot) => {
            if (slot.time === time) {
              return slot.day === day ? false : true
            }

            return true
          }),
        ]
      } else {
        this.weeklySlots = [...this.weeklySlots, ...[{ time, day }]]
      }
    },
    async handleSubmit() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return
      }

      // const { name, company } = this
      // await this.login({ email, password })
      //   .then((_res) => {
      //     this.error = null
      //     this.$router.push("/dashboard")
      //   })
      //   .catch((err) => {
      //     this.error = err
      //     // const { data, code } = err
      //     // if (data && code === 401) {
      //     //   Object.keys(data).forEach((key) => {
      //     //     this.error = data[key]
      //     //   })
      //     // }
      //   })
    },
  },
}
</script>

<style scoped lang="scss">
.create {
  &__content {
    margin-top: 32px;
  }

  &__cta {
    margin-top: 25px;
    .button {
      margin-right: 16px;
    }
  }
}

.panel {
  background: #ffffff;
  border-radius: 4px;
  &.sticky {
    width: 100%;
    position: sticky;
    top: 124px;
    align-self: flex-start;
  }
  & + & {
    margin-top: 24px;
  }
  &__title {
    padding: 24px;
    border-bottom: 1px solid #e8e8e8;
  }
  &__section {
    padding: 32px 24px;
    border-bottom: 1px solid #e8e8e8;
    &:last-child {
      border-bottom: 0;
    }
  }
}

.limits {
  max-width: 776px;
}

.times {
  margin-top: 16px;
  max-width: 616px;
}

.strategy {
  margin-top: 16px;
}

.allocation {
  max-width: 616px;
  ::v-deep .radiogroup__item {
    flex: 0 0 calc(50% - 12px);
  }
}

.calendar {
  max-width: 849px;
}

.frequency {
  margin-top: 25px;
  max-width: 456px;
}

.summary {
  display: flex;
  align-items: center;
  margin-top: -8px;
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
    font-size: 16px;
    text-align: right;
    &.disabled {
      color: $colorGray;
      font-weight: 400;
    }
  }
}
</style>
