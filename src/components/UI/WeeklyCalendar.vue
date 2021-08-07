<template>
  <div class="calendar">
    <div class="calendar__head">
      <div class="calendar__head-spacer"></div>
      <div class="calendar__times">
        <div class="calendar__time" v-for="time in times" :key="time.key">
          <span>{{ time.label }}</span>
        </div>
      </div>
    </div>

    <div class="calendar__day" v-for="day in days" :key="day.id">
      <div class="calendar__day-title">
        <span>{{ day.label }}</span>
      </div>
      <div class="calendar__cells">
        <div
          class="calendar__cell"
          :class="[activeSlots.some((s) => s.time === time.key && s.day === day.id) && 'active']"
          v-for="time in times"
          :key="time.key"
          @click="$emit('onSelect', { time: time.key, day: day.id })"
        >
          <div class="calendar__cell-bg"></div>
          <div class="calendar__cell-helper" v-if="getRangerHelper(time.key, day.id)">
            {{ getRangerHelper(time.key, day.id) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeSlots: {
      type: Array,
      required: true,
    },
  },
  computed: {
    times() {
      return [...Array(24).keys()].map((i) => ({
        key: i,
        label: `${String(i).padStart(2, "0")}:00`,
      }))
    },
    days() {
      const days = [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
      ]

      return days.map((day, idx) => ({
        id: idx + 1,
        label: day,
      }))
    },
  },
  methods: {
    getRangerHelper(time, day) {
      this.activeSlots.map((s) => {
        if (s.day === day) {
          if (s.time === time) {
            // console.log("first cell of range", day)
          }
        }
      })

      return false
    },
  },
}
</script>

<style scoped lang="scss">
.calendar {
  &__head {
    display: flex;
    background: #f7f8f9;
  }
  &__head-spacer {
    flex: 0 0 126px;
  }
  &__times {
    flex: 1 1 auto;
    min-width: 1px;
    display: flex;
    min-height: 56px;
  }
  &__time {
    position: relative;
    width: 100%;
    flex: 0 0 4.166667%;
    max-width: 4.166667%;
    min-width: 1px;
    color: #8b9db3;
    font-size: 14px;
    font-family: $sansFont;
    span {
      position: absolute;
      top: 40%;
      left: 0%;
      right: 8px;
      display: inline-block;
      transform: rotate(-90deg);
      transform-origin: center center;
      // width: 32px;
    }
  }
  &__day {
    display: flex;
    align-items: center;
    margin: 6px 0;
  }
  &__day-title {
    flex: 0 0 126px;
    span {
      font-size: 14px;
    }
  }
  &__cells {
    flex: 1 1 auto;
    min-width: 1px;
    display: flex;
    min-height: 35px;
  }
  &__cell {
    position: relative;
    width: 100%;
    flex: 0 0 4.166667%;
    max-width: 4.166667%;
    min-width: 1px;
    &.active {
      .calendar__cell-bg {
        background: $colorPrimary;
      }
      & + & {
        .calendar__cell-bg {
          left: -8px;
        }
      }
    }
  }
  &__cell-bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 8px;
    display: inline-block;
    background: #f7f8f9;
    cursor: pointer;
    transition: background 0.25s $ease, left 0.1s $ease;
    &:hover {
      background: $colorPrimaryHover;
    }
  }
  &__cell-helper {
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    font-weight: 600;
    font-size: 12px;
  }
}
</style>
