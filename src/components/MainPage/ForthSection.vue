<template>
  <section :style="{ height: `${sectionHeight}px` }">
    <div class="card-container inner">
      <ul class="card-list">
        <li :style="{ opacity: `${aniValue([-0.4, -0.3, 0, 1])}` }">
          <h1>
            <b>검색</b>하여<br />
            영상찾기
          </h1>
          <div class="img">
            <img src="@/assets/images/card1.png" alt="" />
          </div>
          <span @click="$router.push({ name: 'SearchMain' })">
            <font-awesome-icon :icon="['fas', 'angle-right']" />
          </span>
        </li>
        <li :style="{ opacity: `${aniValue([-0.3, -0.2, 0, 1])}` }">
          <h1><b>영화</b><br />확인하기</h1>
          <div class="img">
            <img src="@/assets/images/card2.png" alt="" />
          </div>
          <span @click="$router.push({ name: 'MovieMain' })">
            <font-awesome-icon :icon="['fas', 'angle-right']" />
          </span>
        </li>
        <li :style="{ opacity: `${aniValue([-0.2, -0.1, 0, 1])}` }">
          <h1>
            <b>Tv 시리즈</b><br />
            확인하기
          </h1>
          <div class="img">
            <img src="@/assets/images/card3.png" alt="" />
          </div>
          <span @click="$router.push({ name: 'TvMain' })">
            <font-awesome-icon :icon="['fas', 'angle-right']" />
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    scrollTop: Number,
    sectionHeight: Number,
    prevScrollHeight: Number,
  },
};
</script>

<style lang="scss" scoped>
section {
  background: #cecece;
}

.card-container {
  padding: 10vh 0;
}
.card-list {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  height: 80vh;
  width: 50%;
  margin: 0 auto;
  gap: 2%;
  > li {
    position: relative;
    width: 100%;
    height: 100%;
    background: #000;
    border-radius: 30px;
    padding: 20px;
    h1 {
      position: relative;
      z-index: 5;
      font-size: 40px;
      font-weight: 700;
      text-align: center;
      line-height: 1.5;
      b {
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        background-image: linear-gradient(180deg, #ffb6ff, #b344ff);
        will-change: transform;
        overflow: hidden;
      }
    }
    .img {
      position: absolute;
      width: 80%;
      height: 80%;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      text-align: center;
      opacity: 0.8;
      img {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
    span {
      position: absolute;
      right: 20px;
      bottom: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      font-size: 30px;
      cursor: pointer;
    }
    &:nth-child(1) {
      grid-column: 1 / span 2;
    }
  }
}
</style>
