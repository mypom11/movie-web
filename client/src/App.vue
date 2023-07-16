<template>
  <AppHeader />
  <router-view v-slot="{ Component }">
    <keep-alive :include="['MainPage', 'MovieMain', 'TvMain', 'SearchMain']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <FooterComponent />
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  components: { AppHeader, FooterComponent },
};
</script>

<style lang="scss">
@import "~@/assets/scss/main.scss";
</style>
