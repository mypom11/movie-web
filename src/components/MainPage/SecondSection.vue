<template>
  <section :style="{ height: `${sectionHeight}px` }">
    <div class="sticky-container">
      <div class="background-img">
        <img
          src="@/assets/images/main-img.png"
          alt=""
          :style="{ transform: `scale( ${aniValue([0.5, 0.6, 2, 1])})` }"
        />
        <div
          class="after"
          :style="{ height: ` ${aniValue([0.45, 0.5, 100, 0])}%` }"
        ></div>
        <h1
          class="typoA"
          :style="{
            transform: `translateY( ${aniValue([0.05, 0.15, 100, 0])}px)`,
            opacity: `${
              currentY >= getRatio(0.2)
                ? aniValue([0.15, 0.25, 1, 0])
                : aniValue([0.05, 0.15, 0, 1])
            }`,
          }"
        >
          영화를 탐색하는 <br />새로운 방법 발견
        </h1>
        <h1
          class="typoB"
          :style="{
            transform: `translateY( ${aniValue([0.25, 0.35, 100, 0])}px)`,
            opacity: `${
              currentY >= getRatio(0.35)
                ? aniValue([0.35, 0.45, 1, 0])
                : aniValue([0.25, 0.35, 0, 1])
            }`,
          }"
        >
          커버 플로우 쇼케이스에 <br />
          빠져보세요!
        </h1>
      </div>
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
  data() {
    return {};
  },
  computed: {
    currentY() {
      return this.scrollTop - this.prevScrollHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  background: #fff;
}
.sticky-container {
  position: sticky;
  top: 59px;
}

.background-img {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  padding-top: 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
  .after {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
  }
  img {
    transform-origin: 50% 25%;
    width: auto;
    height: calc(100vh - 200px);
    transform: scale(2);
  }
  .typoA,
  .typoB {
    position: absolute;
    font-size: 80px;
    font-weight: 700;
    line-height: 1.5;
    opacity: 0;
  }
  .typoA {
    top: 20%;
    right: 20%;
    text-align: right;
  }
  .typoB {
    top: 40%;
    left: 20%;

    text-align: left;
  }
}
</style>
