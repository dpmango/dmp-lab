<template>
  <DashboardTemplate>
    <DashboardTabs :activeTab="tab" @onTabChange="(t) => (tab = t)" />

    <CompanyList v-if="tab === 1" />
    <AdGroupList v-if="tab === 2" />
    <AdList v-if="tab === 3" />
  </DashboardTemplate>
</template>

<script>
export default {
  data: () => ({
    tab: 1,
  }),
}
</script>

<style lang="scss">
// .tabChange-enter-active,
// .tabChange-leave-active {
//   height: 100%;
//   transition: opacity 0.3s, height 0.25s $ease;
// }
// .tabChange-enter,
// .tabChange-leave-to {
//   opacity: 0;
//   height: 0;
// }
</style>
