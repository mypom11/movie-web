<template>
  <section class="visual-section" :style="{ height: `${sectionHeight}px` }">
    <div class="visual-container">
      <div class="text-container">
        <div
          class="first-typo"
          :style="{
            opacity: `${1 - scrollTop / 1000}`,
          }"
        ></div>
        <div
          class="second-typo"
          :style="{
            transform: `translate3d(-50%, -50%, ${aniValue([
              0.1, 0.2, 0, 50,
            ])}px)`,
            opacity: `${
              scrollTop >= getRatio(0.18)
                ? aniValue([0.2, 0.21, 1, 0])
                : aniValue([0.15, 0.2, 0, 1])
            }`,
          }"
        >
          좋아하는 영화와 TV 시리즈를
        </div>
        <div
          class="third-typo"
          :style="{
            transform: `translate3d(-50%, -50%, ${aniValue([
              0.2, 0.3, 0, 60,
            ])}px)`,
            opacity: `${
              scrollTop >= getRatio(0.28)
                ? aniValue([0.3, 0.31, 1, 0])
                : aniValue([0.2, 0.3, 0, 1])
            }`,
          }"
        >
          발견하고 보고 즐기세요!
        </div>
        <div
          class="forth-typo"
          :style="{
            transform: `translate(-50%,${aniValue([0.2, 0.6, 200, -270])}px)`,
            opacity: `${aniValue([0.3, 0.31, 0, 1])}`,
          }"
        >
          <span
            :class="{
              on: scrollTop >= getRatio(0.3) && scrollTop < getRatio(0.4),
            }"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing</span
          ><span
            :class="{
              on: scrollTop >= getRatio(0.4) && scrollTop < getRatio(0.5),
            }"
          >
            elit. Aut consequuntur dignissimos nostrum
          </span>
          <span
            :class="{
              on: scrollTop >= getRatio(0.5) && scrollTop < getRatio(0.6),
            }"
            >temporibus perferendis, non vel ut, alias eum ipsum </span
          ><span
            :class="{
              on: scrollTop >= getRatio(0.6),
            }"
          >
            recusandae fuga aspernatur possimus distinctio
          </span>
        </div>
      </div>
      <div class="img-list">
        <ul
          :style="{
            transform: `translateX( ${aniValue([0, 0.2, 0, -1000])}px)`,
            opacity: `${aniValue([0, 0.2, 1, 0])}`,
          }"
        >
          <li v-for="i in 10" :key="i">
            <img :src="require(`@/assets/images/poster${i}.jpeg`)" alt="" />
          </li>
        </ul>
        <ul
          :style="{
            transform: `translateX( ${aniValue([0, 0.2, 0, 1000])}px)`,
            opacity: `${aniValue([0, 0.2, 1, 0])}`,
          }"
        >
          <li v-for="i in 10" :key="i">
            <img :src="require(`@/assets/images/poster1-${i}.jpeg`)" alt="" />
          </li>
        </ul>
        <ul
          :class="{ dn: scrollTop >= 1080 }"
          :style="{
            transform: `translateX( ${aniValue([0, 0.2, 0, -1000])}px)`,
            opacity: `${aniValue([0, 0.2, 1, 0])}`,
          }"
        >
          <li v-for="i in 10" :key="i">
            <img :src="require(`@/assets/images/poster2-${i}.jpeg`)" alt="" />
          </li>
        </ul>
        <ul
          :class="{ dn: scrollTop >= 1080 }"
          :style="{
            transform: `translateX( ${aniValue([0, 0.2, 0, 1000])}px)`,
            opacity: `${aniValue([0, 0.2, 1, 0])}`,
          }"
        >
          <li v-for="i in 10" :key="i">
            <img :src="require(`@/assets/images/poster3-${i}.jpeg`)" alt="" />
          </li>
        </ul>
      </div>
      <ul class="provider">
        <li
          v-for="(value, name) in providerName"
          :key="value"
          :style="{
            transform: `translateY(${aniValue([0.4, 0.6, 200, 0])}px)`,
            opacity: `${aniValue([0.4, 0.6, 0, 1])}`,
          }"
        >
          <div class="logo" :class="`logo-${name}`">
            <img :src="require(`@/assets/images/logo_${name}.png`)" alt="" />
          </div>
          <!-- <p>{{ providerName[`${provider.provider_id}`] }} - 스트리밍</p> -->
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
  data() {
    return {
      scrollRatio: 0,
      heightNum: 2.3,
      providerName: {
        3: "구글 플레이",
        8: "넷플릭스",
        96: "네이버 시리즈온",
        97: "왓챠",
        337: "디즈니 플러스",
        350: "애플TV+",
        356: "웨이브",
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
main {
  background: #000;
  min-height: 100vh;
  min-width: 100vw;
}
section {
  min-height: 100vh;
}
.dn {
  display: none;
}
.test {
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  font-size: 20px;
  font-weight: 600;
  color: red;
  z-index: 999;
}
.visual-section {
  //   height: 250vh;
  .visual-container {
    position: -webkit-sticky;
    position: sticky;
    height: 100vh;
    width: 100vw;
    top: 60px;
    margin: 0 auto;
    overflow: hidden;
  }
  .text-container {
    position: relative;
    height: 100%;
    perspective: 100px;
    > div {
      position: absolute;
      font-size: 80px;
      font-weight: 700;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
    .first-typo {
      transform: translateX(0px);
      opacity: 1;
      transition: 0.2s;
      left: 5%;
      top: 20%;
      font-size: 70px;
    }
    .forth-typo {
      opacity: 0;
      bottom: 0%;
      color: rgba($color: #fff, $alpha: 0.6);
      font-size: 60px;
      > span {
        transition: 1s;
        &.on {
          color: #fff;
        }
      }
    }
  }
  .img-list {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateZ(6deg);
    > ul {
      position: relative;
      width: fit-content;
      height: 300px;
      display: flex;
      gap: 10px;
      margin-bottom: 10px;

      &:nth-child(even) {
        flex-direction: row-reverse;
      }
      > li {
        position: relative;
        background: #fff;
        width: 200px;
        height: 300px;
        transition: transform 0.3s ease; /* Smooth transition effect */
        border-radius: 5px;
        overflow: hidden;

        &:before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba($color: #000000, $alpha: 0.1);
        }
      }
    }
  }
}
.provider {
  position: absolute;
  width: 100%;
  bottom: 100px;
  display: flex;
  justify-content: center;
  gap: 20px;
  > li {
    width: 240px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 6px rgba($color: #ffffff, $alpha: 0.25);
    opacity: 0;

    .logo {
      height: 120px;
      position: relative;
      background: #000;
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 70%;
        height: auto;
      }
      &.logo-3 {
        background: #fff;
      }
      &.logo-96 {
        background: #000;
        img {
          width: 100%;
        }
      }
      &.logo-337 {
        background: #030f40;
      }
    }
  }
}

.second-visual {
  background: #fff;
}
</style>
