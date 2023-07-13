<template>
  <div class="inner">
    <div class="slider-container">
      <h2>{{ title }}</h2>
      <span
        class="arrow-left"
        v-if="currentSlide !== 0"
        @click="currentSlide--"
      >
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </span>
      <span
        class="arrow-right"
        @click="currentSlide++"
        v-if="currentSlide < listData.length - 1 && listData.length > 0"
      >
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </span>
      <ul
        class="content-list"
        :style="{ transform: `translateX(${-currentSlide * 1920}px)` }"
      >
        <li v-for="(list, i) in listData" :key="i">
          <img
            v-if="list.backdrop_path !== null"
            :src="`https://image.tmdb.org/t/p/original/${list.backdrop_path}`"
            alt=""
          />
          <img v-else src="@/assets/images/no-image.png" alt="" />
          <div class="text-container">
            <img
              :src="`https://image.tmdb.org/t/p/original/${list.poster_path}`"
              alt=""
            />
            <div>
              <h4 v-if="type === 0">
                {{ dateChange(list.release_date) }} 개봉
              </h4>
              <h4 v-if="type === 1">
                {{ dateChange(list.first_air_date) }}
              </h4>
              <h1>{{ list.title }}</h1>
              <h1>{{ list.name }}</h1>
              <p>{{ list.overview }}</p>
            </div>
            <button @click="moveDetailPage(list.id)">상세페이지로 이동</button>
          </div>
        </li>
      </ul>
      <ul class="tab-list">
        <li
          v-for="i in listData.length"
          :key="i"
          :class="{ on: currentSlide === i - 1 }"
          @click="currentSlide = i - 1"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  props: {
    type: Number,
    title: String,
    listData: Array,
  },
  data() {
    return {
      currentSlide: 0,
    };
  },

  methods: {
    moveDetailPage(id) {
      if (this.type === 0) {
        this.$router.push({ name: "MovieDetail", query: { id } });
      } else {
        this.$router.push({ name: "TvDetail", query: { id } });
      }
    },
    dateChange(index) {
      const date = new Date(index).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return date;
    },
  },
};
</script>

<style lang="scss" scoped>
.slider-container {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  h2 {
    position: absolute;
    left: 50%;
    top: 50px;
    text-align: center;
    font-size: 40px;
    transform: translateX(-50%);
    font-weight: 600;
    z-index: 50;
    color: rgba($color: #ffffff, $alpha: 0.6);
  }

  &:hover {
    .arrow-left,
    .arrow-right {
      opacity: 1;
    }
  }

  .arrow-left,
  .arrow-right {
    cursor: pointer;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 190px;
    z-index: 10;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 30px;
    transition: 0.2s;
    opacity: 0;
  }
  .arrow-left {
    left: 0;
  }
  .arrow-right {
    right: 0px;
  }
}
.content-list {
  display: flex;
  width: fit-content;
  transition: 0.5s ease;
  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.6);
  }
  > li {
    width: 1920px;
    height: 1080px;
    position: relative;

    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.25);
    &:hover {
      .video-wrapper:after {
        background: rgba($color: #000000, $alpha: 0.4);
      }
    }
  }
  .text-container {
    position: absolute;
    z-index: 20;
    left: 5%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    color: #ffffff;
    img {
      width: 260px;
      height: auto;
      margin-right: 40px;
    }
    h4 {
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 30px;
    }
    h1 {
      font-size: 70px;
      font-weight: 700;
      width: 1000px;
      word-break: keep-all;
      margin-bottom: 50px;
    }
    p {
      font-size: 20px;
      width: 700px;
      color: rgba($color: #ffffff, $alpha: 0.8);
    }
    button {
      all: unset;
      width: 260px;
      text-align: center;
      border: 1px solid rgba($color: #ffffff, $alpha: 0.8);
      height: 60px;
      position: absolute;
      bottom: -100px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      background: transparent;
      transition: 0.2s;
      &:hover {
        background: #000;
      }
    }
  }
}
.tab-list {
  position: absolute;
  z-index: 10;
  bottom: 40px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  gap: 20px;
  > li {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    cursor: pointer;
    background: rgba($color: #ffffff, $alpha: 0.6);
    &:hover,
    &.on {
      background: rgba($color: #ffffff, $alpha: 1);
    }
  }
}
</style>
