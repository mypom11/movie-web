<template>
  <section
    :style="{
      background: `no-repeat center/100% url(https://image.tmdb.org/t/p/original/${movieList[mainCard].backdrop_path})`,
    }"
  >
    <h2>{{ title }}</h2>
    <ul
      class="cover-flow"
      ref="coverFlow"
      @scroll="moveScroll"
      @mousedown="startDrag"
      @mousemove="drag"
      @mouseleave="endDrag"
      @mouseup="endDrag"
    >
      <li
        v-for="(movie, i) in movieList"
        :key="i"
        @click="clickCover(i)"
        :class="{ main: mainCard === i }"
      >
        <div class="movie-img">
          <img
            draggable="false"
            :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
            alt=""
          />
          <span class="background"></span>
          <button
            class="custom"
            @click.prevent="moveDetailPage(movie.id, $event)"
          >
            상세보기
          </button>
        </div>
        <div class="movie-title">
          <StarRating :rating="movie.vote_average" />
          <h4 v-if="type === 0">{{ movie.title }}</h4>
          <h4 v-if="type === 1">{{ movie.name }}</h4>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import StarRating from "./StarRating.vue";
export default {
  mounted() {
    this.$refs.coverFlow.scrollLeft = 150;
    this.moveScroll();
  },
  data() {
    return {
      coverSize: 330,
      mouseDrag: false,
      mainCard: 0,
    };
  },
  methods: {
    moveDetailPage(id, event) {
      event.stopPropagation();
      if (this.type === 0) {
        this.$router.push({ name: "MovieDetail", query: { id } });
      } else {
        this.$router.push({ name: "TvDetail", query: { id } });
      }
    },
    moveScroll() {
      const scrollLeft = this.$refs.coverFlow.scrollLeft;
      this.mainCard = parseInt(scrollLeft / this.coverSize);
      const lis = this.$refs.coverFlow.querySelectorAll("li");
      lis.forEach((item, i) => {
        if (this.mainCard === i) {
          item.style.transform = `rotateY(0deg) scale(2)`;
          item.style.zIndex = 100;
        } else if (this.mainCard < i) {
          item.style.transform = `rotateY(-20deg) translateX(200px)`;
          item.style.zIndex = 100 - i;
        } else {
          item.style.transform = `rotateY(20deg) translateX(-200px)`;
          item.style.zIndex = i;
        }
      });
    },
    clickCover(index) {
      this.$refs.coverFlow.scrollLeft = this.coverSize * index + 150;
    },
    startDrag(event) {
      this.mouseDrag = true;
      this.initialMousePos = event.clientX;
      this.initialScrollLeft = this.$refs.coverFlow.scrollLeft;
    },
    // 드래그를 처리하여 스크롤 위치를 조정합니다.
    drag(event) {
      if (this.mouseDrag) {
        const delta = event.clientX - this.initialMousePos;
        this.$refs.coverFlow.scrollLeft = this.initialScrollLeft - delta;
      }
    },
    // 드래그 종료 시 드래그 상태를 재설정합니다.
    endDrag() {
      this.mouseDrag = false;
      this.initialMousePos = null;
      this.initialScrollLeft = null;
    },
  },
  props: {
    movies: Array,
    title: String,
    type: Number,
  },
  computed: {
    movieList() {
      return this.movies;
    },
  },
  components: { StarRating },
};
</script>

<style lang="scss" scoped>
section {
  position: relative;
  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.6);
  }
}
$cover-width: 300px;
.cover-flow {
  width: 100vw;
  min-height: calc($cover-width * 4);
  margin: 0 auto;
  padding: 0 50%;
  overflow-x: scroll;
  white-space: nowrap;
  perspective: 600px;
  > li {
    perspective: 400px;
    will-change: transform;
    display: inline-block;
    margin-right: 30px;
    transition: 0.5s ease;
    position: relative;
    margin-top: 250px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
    img {
      display: block;
      width: 300px;
      height: 450px;
      -webkit-box-reflect: below 0.5em
        linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25));
    }
    &.main {
      .movie-img {
        .background {
          display: none;
        }
      }
      .movie-title {
        display: block;
      }
      &:hover {
        .movie-img {
          .custom {
            display: block;
          }
        }
      }
    }
    .movie-img {
      position: relative;
      .background {
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
      }
      .custom {
        display: none;
        position: absolute;
        left: 50%;
        top: 50%;
        opacity: 0.8;
        transform: translate(-50%, -50%);
      }
    }
  }
}
@keyframes title-ani {
  0% {
    opacity: 0;
    transform: translateZ(-100px) rotateX(50deg);
  }
  100% {
    transform: translateZ(0px) rotateX(50deg);
    opacity: 1;
  }
}
.movie-title {
  display: none;
  margin-top: 10px;
  width: $cover-width;
  transform: rotateX(50deg);
  position: relative;
  opacity: 0;
  animation: 0.5s title-ani forwards;
  h4 {
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin-top: 10px;
    text-align: left;
    font-size: 30px;
    font-weight: 700;
    text-shadow: 0px 0px 4px rgba($color: #000000, $alpha: 0.6);
  }
}

h2 {
  font-size: 40px;
  position: absolute;
  left: 10%;
  top: 10%;
  z-index: 101;
  font-weight: 600;
}
</style>
