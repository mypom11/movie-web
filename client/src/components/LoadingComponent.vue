<template>
  <article id="loading">
    <div class="loading-icon"></div>
  </article>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
$loading-color: #fff;
@keyframes loading {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

#loading {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000, $alpha: 0.5);
  z-index: 500;
  .loading-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 60px;
    width: 60px;
    margin: 0 auto 12px;
    &:before {
      content: "";
      box-sizing: border-box;
      display: inline-block;
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 5px solid $loading-color;
      animation: loading 1s infinite;
    }
    &::after {
      content: "";
      box-sizing: border-box;
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 5px solid $loading-color;
      animation: loading 1s 0.5s infinite;
    }
  }
}
</style>
