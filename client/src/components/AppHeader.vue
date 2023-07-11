<template>
  <header>
    <div class="inner">
      <ul class="nav">
        <li @click="$router.push({ name: 'Main' })">홈</li>
        <li>영화</li>
        <li>TV시리즈</li>
        <li>검색</li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {};
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
