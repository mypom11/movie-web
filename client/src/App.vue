<template>
  <AppHeader />
  <router-view v-slot="{ Component }">
    <keep-alive :include="['MainPage', 'MovieMain', 'TvMain', 'SearchMain']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";

export default {
  components: { AppHeader },
};
</script>

<style lang="scss">
@import "~@/assets/scss/main.scss";
</style>
