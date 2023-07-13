<template>
  <div class="inner">
    <h2>{{ title }}</h2>
    <div class="slider-container">
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
        v-if="currentSlide < listData.length - 5 && listData.length > 5"
      >
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </span>
      <ul
        class="trailer-list"
        :style="{ transform: `translateX(${-currentSlide * 377}px)` }"
      >
        <li
          v-for="(list, i) in listData"
          :key="i"
          @click="moveDetailPage(list.id)"
        >
          <div class="video-wrapper">
            <img
              v-if="list.backdrop_path !== null"
              :src="`https://image.tmdb.org/t/p/original/${list.backdrop_path}`"
              alt=""
            />
            <img v-else src="@/assets/images/no-image.png" alt="" />
            <h3 v-if="!desc">{{ list.title }}</h3>
            <h3 v-if="!desc">{{ list.name }}</h3>
          </div>
          <div class="text-wrapper" v-if="desc">
            <p>{{ list.title }}</p>
            <p>{{ list.name }}</p>
            <h6>{{ list.overview }}</h6>
            <p v-if="type === 0">{{ dateChage(list.release_date) }}</p>
            <p v-else>{{ dateChage(list.first_air_date) }}</p>
          </div>
        </li>
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
    desc: Boolean,
  },
  data() {
    return {
      currentSlide: 0,
    };
  },

  methods: {
    dateChage(index) {
      const date = new Date(index).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return date;
    },
    moveDetailPage(id) {
      if (this.type === 0) {
        this.$router.push({ name: "MovieDetail", query: { id } });
      } else {
        this.$router.push({ name: "TvDetail", query: { id } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 40px;
}
.slider-container {
  position: relative;
  overflow: hidden;
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
    top: 0;
    font-size: 30px;
    transition: 0.2s;
    opacity: 0;
  }
  .arrow-left {
    left: 0;
    background: linear-gradient(
      -90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    );
  }
  .arrow-right {
    right: 0px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    );
  }
}
.trailer-list {
  display: flex;
  gap: 40px;
  transition: 0.5s ease;
  > li {
    &:hover {
      .video-wrapper h3:after {
        background: rgba($color: #000000, $alpha: 0.1);
      }
    }
    .video-wrapper {
      cursor: pointer;
      width: 337px;
      overflow: hidden;
      height: 190px;
      border-radius: 10px;
      box-shadow: 0 4px 7px rgba(0, 0, 0, 0.25);
      margin-bottom: 10px;
      position: relative;

      h3 {
        position: absolute;
        z-index: 10;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: 600;
        width: 100%;
        text-align: center;
        word-break: keep-all;
        pointer-events: none;
        text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
        padding: 0 20px;
        &:after {
          content: "";
          position: absolute;
          display: block;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba($color: #000000, $alpha: 0.4);
        }
      }
    }
    .text-wrapper {
      width: 337px;
      font-size: 10px;
      color: rgba($color: #ffffff, $alpha: 0.8);
      p {
        margin-bottom: 10px;
        font-size: 20px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:last-child {
          margin-bottom: 0;
          font-size: 16px;
          height: auto;
          color: rgba($color: #ffffff, $alpha: 0.6);
        }
      }
      h6 {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        font-size: 15px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
