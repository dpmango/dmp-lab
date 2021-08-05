<template>
  <div class="badge" :class="[`status-${status}`]">
    <span v-if="status === 1">НА МОДЕРАЦИИ</span>
    <span v-else-if="status === 2">ОТКЛОНЕНА</span>
    <span v-else-if="status === 3">ОДОБРЕНА</span>
  </div>
</template>

<script>
export default {
  props: {
    status: Number,
  },
}
</script>

<style scoped lang="scss">
.badge {
  display: inline-flex;
  background: transparent;
  border: 1px solid $colorAccent;
  border-radius: 2px;
  padding: 2px 12px;
  span {
    font-weight: 600;
    font-size: 10px;
    line-height: 150%;
    text-transform: uppercase;
  }
  &.status-1 {
    border-color: #89a7e0;
    span {
      color: #5691c8;
    }
  }
  &.status-2 {
    background: $colorRed;
    border-color: transparent;
    span {
      color: white;
    }
  }
  &.status-3 {
    border-color: $colorGreen;
    span {
      color: $colorGreen;
    }
  }
}
</style>
