<template>
  <AppHeader />
  <RouterView />
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
