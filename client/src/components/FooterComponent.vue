<template>
  <footer>
    <div class="inner">
      <h4>movie-web</h4>
      <p>Copyright 2023.Min-jeongki.All rights reserved.</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background: #2d2d2d;
  border-top: 1px solid #000;
  & > div {
    height: 60px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      color: rgba($color: #fff, $alpha: 0.6);
      font-weight: 600;
      font-size: 20px;
    }
    p {
      font-weight: 300;
      letter-spacing: 2px;
      font-size: 12px;
      color: rgba($color: #fff, $alpha: 0.6);
    }
  }
}
</style>
