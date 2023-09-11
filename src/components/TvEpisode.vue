<template>
  <div class="inner" v-if="loading">
    <h2>시즌 {{ season }} 에피소드</h2>
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
        v-if="
          currentSlide < episode.episodes.length - 5 &&
          episode.episodes.length > 5
        "
      >
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </span>
      <ul
        class="trailer-list"
        :style="{ transform: `translateX(${-currentSlide * 377}px)` }"
      >
        <li v-for="(episode, i) in episode.episodes" :key="i">
          <div class="video-wrapper">
            <img
              v-if="episode.still_path !== null"
              :src="`https://image.tmdb.org/t/p/original/${episode.still_path}`"
              alt=""
            />
            <img v-else src="@/assets/images/no-image.png" alt="" />
          </div>
          <div class="text-wrapper">
            <p>{{ episode.name }}</p>
            <h6>{{ episode.overview }}</h6>
            <p>{{ dateChage(episode.air_date) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getTvSeries(this.season);
  },
  props: {
    season: Number,
  },
  data() {
    return {
      episode: {},
      loading: false,
      currentSlide: 0,
    };
  },

  methods: {
    getTvSeries(season) {
      const option = { id: this.$route.query.id, season };
      this.$axios
        .get(`${process.env.VUE_APP_URL}/tv/season`, { params: option })
        .then((res) => {
          this.episode = { ...res.data.list };
          this.loading = true;
          return res;
        });
    },
    dateChage(index) {
      const date = new Date(index).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return date;
    },
  },
  watch: {
    season() {
      this.currentSlide = 0;
      this.getTvSeries(this.season);
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
      .video-wrapper:after {
        display: block;
      }
    }
    .video-wrapper {
      width: 337px;
      overflow: hidden;
      height: 190px;
      border-radius: 10px;
      box-shadow: 0 4px 7px rgba(0, 0, 0, 0.25);
      margin-bottom: 10px;
      position: relative;
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
