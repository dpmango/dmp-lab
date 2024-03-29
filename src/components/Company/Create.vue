<template>
  <div class="create">
    <UiBreadcrumbs :list="crumbs" />

    <Form ref="form" as="form" class="create__content" @submit="handleSubmit">
      <div class="row">
        <div class="col col-8 col-sm-12">
          <div class="panel">
            <h3 class="panel__title h3-title">Название кампании</h3>
            <div class="panel__section">
              <UiError :error="error" />

              <Field
                v-model="name"
                name="name"
                v-slot="{ errorMessage, field }"
                rules="required|max:200"
              >
                <UiInput
                  theme="dynamic"
                  label="Введите название"
                  helper="Название не должно превышать 200 символов."
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
                  <div class="col col-5 col-mb-12">
                    <UiRadioGroup
                      label="Выберите тип"
                      :activeId="limitTypeId"
                      :options="limitTypeOptions"
                      @onChange="(id) => (limitTypeId = id)"
                    />
                  </div>
                  <div class="col col-7 col-mb-12">
                    <div class="row">
                      <div class="col col-6 col-mbs-12">
                        <Field
                          v-model="limit"
                          name="limit"
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
                      <div class="col col-6 col-mbs-12">
                        <Field
                          v-model="limitTotal"
                          name="limitTotal"
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
                    </div>
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
                  <div class="col col-6 col-mbs-12">
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
                  <div class="col col-6 col-mbs-12">
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

        <div class="col col-4 col-sm-12">
          <div class="panel sticky">
            <h3 class="panel__title h3-title">Основные настройки</h3>

            <div class="panel__section">
              <Summary
                :limit="limit"
                :limitTotal="limitTotal"
                :limitTypeId="limitTypeId"
                :frequencyTimes="frequencyTimes"
                :frequencyHours="frequencyHours"
                :showTimes="showTimes"
                :strategyByView="strategyByView"
                :allocationTypeOptions="allocationTypeOptions"
                :allocationTypeId="allocationTypeId"
              />
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
import Summary from "./partials/Summary"
import djs from "dayjs"
import groupBy from "lodash/groupBy"
import { mapActions } from "vuex"
import { covertDayIdToName } from "@/utils"

export default {
  components: { Summary },
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
    showTimes() {
      const groupedByDay = groupBy(this.weeklySlots, (x) => x.day)

      const getTime = (id) => {
        return `${String(id).padStart(2, "0")}:00`
      }

      if (Object.keys(groupedByDay).length) {
        return Object.keys(groupedByDay).map((key) => ({
          day: covertDayIdToName(key),
          times: groupedByDay[key].map((x) => getTime(x.time)),
        }))
      }

      return []
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

      const {
        name,
        limitTypeId,
        limit,
        limitTotal,
        allocationTypeId,
        strategyByView,
        startType,
        date,
        time,
        frequencyTimes,
        frequencyHours,
      } = this

      const limitTypeById = () => {
        switch (limitTypeId) {
          case 1:
            return "budget"
          case 2:
            return "clicks"
          case 3:
            return "impressions"
          default:
            return ""
        }
      }

      const getStartTime = () => {
        if (startType === "now") {
          return djs().toDate()
        } else {
          const dateD = djs(date)
          const timeD = djs(time)

          return djs(`${dateD.format("YYYY-MM-DD")} ${timeD.format("HH:mm")}`).toDate()
        }
      }

      await this.createCompaign({
        name,
        limits: [
          {
            type: limitTypeById(),
            limit: parseInt(limit, 10),
            mainLimit: parseInt(limitTotal, 10),
          },
        ],
        typeBudgetAllocate: allocationTypeId === 1 ? "balanced" : "accelerated",
        typeProcurementStrategy: !strategyByView ? "impressions" : "clicks",
        dateStartCompany: getStartTime(),
        showTimes: this.showTimes,
        frequencyСompanyImpressions: {
          more: parseInt(frequencyTimes, 10),
          hour: parseInt(frequencyHours, 10),
        },
      })
        .then((_res) => {
          this.error = null
        })
        .catch((err) => {
          this.error = err.data
          // const { data, code } = err
          // if (data && code === 401) {
          //   Object.keys(data).forEach((key) => {
          //     this.error = data[key]
          //   })
          // }
        })
    },
    ...mapActions("ads", ["createCompaign"]),
  },
  watch: {
    date(val) {
      const valDjs = djs(val)
      const timeDjs = djs(this.time)

      this.time = djs(`${valDjs.format("YYYY-MM-DD")} ${timeDjs.format("HH:mm")}`).toDate()
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
  overflow-x: auto;
  .calendar {
    min-width: 600px;
  }
}

.frequency {
  margin-top: 25px;
  max-width: 456px;
}

@include r($hd) {
  .create {
    &__content {
      margin-top: 18px;
    }
  }

  .panel {
    &__title {
      padding-top: 18px;
      padding-bottom: 18px;
    }
    &__section {
      padding-top: 24px;
      padding-bottom: 24px;
    }
  }
}

@include r($xl) {
  // .create{
  // }

  .panel {
    &.sticky {
      top: 84px;
    }
  }
}

@include r(600) {
  .allocation {
    ::v-deep .radiogroup__item {
      flex: 0 0 100%;
    }
  }
}
</style>
