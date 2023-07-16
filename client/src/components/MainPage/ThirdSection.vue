<template>
  <section :style="{ height: `${sectionHeight}px` }">
    <div class="container inner">
      <div class="typo" v-for="(typo, i) in typoData" :key="i">
        <h2 v-html="typo.title"></h2>
        <p v-html="typo.desc"></p>
        <div class="interaction-img" v-if="i % 2 === 0">
          <div
            v-for="num in 3"
            :key="num"
            :style="{
              transform: `translate( ${aniValue([
                typo.start + (num - 1) * 0.05,
                typo.start + (num - 1) * 0.05 + 0.05,
                20 - (num - 1) * 10,
                140 - (num - 1) * 30,
              ])}%, ${aniValue([
                typo.start + (num - 1) * 0.05,
                typo.start + (num - 1) * 0.05 + 0.05,
                0 + (num - 1) * 10,
                -100 + (num - 1) * 60,
              ])}%) rotate3d(-10, -10, 5,${aniValue([
                typo.start + (num - 1) * 0.05,
                typo.start + (num - 1) * 0.05 + 0.05,
                80,
                0,
              ])}deg)`,
              opacity: `${aniValue([
                typo.start + (num - 1) * 0.05,
                typo.start + (num - 1) * 0.05 + 0.01,
                0,
                1,
              ])}`,
            }"
          >
            <img
              :src="require(`@/assets/images/bg${i + 1}-${num}.jpeg`)"
              alt=""
            />
          </div>
        </div>
        <div class="interaction-img" v-else>
          <div
            v-for="num in 3"
            :key="num"
            :style="{
              transform: `translate( ${aniValue([
                typo.start + (num - 1) * 0.05,
                typo.start + (num - 1) * 0.05 + 0.05,
                -20 + (num - 1) * 10,
                -140 + (num - 1) * 30,
              ])}%, ${aniValue([
                typo.start + (num - 1) * 0.05,
                typo.start + (num - 1) * 0.05 + 0.05,
                0 + (num - 1) * 10,
                -100 + (num - 1) * 60,
              ])}%) rotate3d(-10, -10, 5,${aniValue([
                typo.start + (num - 1) * 0.05,
                typo.start + (num - 1) * 0.05 + 0.05,
                80,
                0,
              ])}deg)`,
              opacity: `${aniValue([
                typo.start + (num - 1) * 0.05,
                typo.start + (num - 1) * 0.05 + 0.01,
                0,
                1,
              ])}`,
            }"
          >
            <img
              :src="require(`@/assets/images/bg${i + 1}-${num}.jpeg`)"
              alt=""
            />
          </div>
        </div>
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
    return {
      typoData: [
        {
          title: "<b>상영 영화</b>와 <br /><b>개봉 예정 영화</b>를 한 눈에!",
          desc: "이 사이트는 현재 개봉 중인 영화와 개봉 예정 영화 과거 인기 있었던 영화들의 정보를 보여줍니다.",
          start: 0,
        },
        {
          title:
            "오늘 보려 했던 영화를<br /><b>어디서 볼 수 있는지</b>도 한 눈에!",
          desc: "이 사이트는 구글, 넷플릭스, 웨이브 등 국내 서비스 중인 OTT사이트의 스트리밍 및 판매 정보를 보여줍니다.",
          start: 0.16,
        },
        {
          title: "TV시리즈의<br /><b>모든 시즌 정보</b>를 한 눈에!",
          desc: "이 사이트는 방영했던 TV시리즈의 방영했던 모든 시즌의 정보를 보여줍니다.",
          start: 0.32,
        },
        {
          title: "<b>내가 찾는 영상</b>의 <br />정보를 한 눈에!",
          desc: "이 사이트는 영화 및 TV시리즈의 검색을 제공합니다.",
          start: 0.6,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  background: #fff;
  overflow: hidden;
}
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50vh 100px 0;
}
.typo {
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 70px;
    font-weight: 700;
    color: rgba($color: #000000, $alpha: 0.8);
    margin-bottom: 40px;
  }
  p {
    font-size: 50px;
    font-weight: 600;
    width: 80%;
    color: rgba($color: #000000, $alpha: 0.6);
  }
  &:nth-child(2n + 1) {
    text-align: left;
    align-items: flex-start;
  }
  &:nth-child(2n) {
    align-self: flex-end;
    text-align: right;
    align-items: flex-end;
    .interaction-img {
      > div {
        transform-origin: right top;
        right: 0;
      }
    }
  }
}
.interaction-img {
  > div {
    width: 800px;
    height: 500px;
    background: #ccc;
    margin-bottom: 20px;
    position: absolute;
    transform-origin: left top;
    border-radius: 20px;
    overflow: hidden;
    border: 20px solid #000;
  }
}

::v-deep(b) {
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(90deg, #80d0f2, #5c82ff, #c480ff);
  -webkit-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
}
</style>
