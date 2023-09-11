<template>
  <header>
    <div class="inner">
      <ul class="nav">
        <li
          @click="$router.push({ name: 'Main' })"
          :class="{ on: $route.path === '/' }"
        >
          홈
        </li>
        <li
          @click="$router.push({ name: 'MovieMain' })"
          :class="{ on: $route.path.includes('Movie') }"
        >
          영화
        </li>
        <li
          @click="$router.push({ name: 'TvMain' })"
          :class="{ on: $route.path.includes('Tv') }"
        >
          TV시리즈
        </li>
        <li
          @click="$router.push({ name: 'SearchMain' })"
          :class="{ on: $route.path.includes('Search') }"
        >
          검색
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  mounted() {},
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  z-index: 150;
  height: 60px;
  background: rgba($color: #000000, $alpha: 1);
  > .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 50px;
    position: relative;
  }
}

.nav {
  display: flex;
  gap: 0 100px;
  > li {
    cursor: pointer;
    font-size: 20px;
    position: relative;
    font-weight: 600;
    color: rgba($color: #ebebeb, $alpha: 0.64);
    &:hover,
    &.on {
      color: rgba($color: #ebebeb, $alpha: 1);
    }
  }
}
</style>
