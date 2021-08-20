<template>
  <div class="badge" :class="[`status-${status}`]">
    <span v-if="status === 'moderation'">НА МОДЕРАЦИИ</span>
    <span v-else-if="status === 'rejection'">ОТКЛОНЕНА</span>
    <span v-else-if="status === 'approved'">ОДОБРЕНА</span>
  </div>
</template>

<script>
export default {
  props: {
    status: String,
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
  &.status-moderation {
    border-color: #89a7e0;
    span {
      color: #5691c8;
    }
  }
  &.status-rejection {
    background: $colorRed;
    border-color: transparent;
    span {
      color: white;
    }
  }
  &.status-approved {
    border-color: $colorGreen;
    span {
      color: $colorGreen;
    }
  }
}
</style>
