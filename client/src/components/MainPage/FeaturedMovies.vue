<template>
  <div class="featured">
    <button class="custom preview" @click="$router.push('PreviousMovie')">
      이전 영화보기
    </button>
    <ul class="tab-header">
      <li @click="tabNumer = 0" :class="{ on: tabNumer === 0 }">현재 상영작</li>
      <li @click="tabNumer = 1" :class="{ on: tabNumer === 1 }">상영 예정작</li>
    </ul>
    <ul class="movie-list">
      <li
        v-for="(movie, i) in movieList"
        :key="i"
        @click="$emit('changeVisual', movie)"
      >
        <div class="movie-img">
          <img
            :src="require(`@/assets/images/sample/${movie.movieImage}`)"
            alt=""
          />
          <span class="rank">{{ i + 1 }}</span>
          <div class="button-group">
            <button class="custom red">예매하기</button>
            <button class="custom">상세보기</button>
          </div>
        </div>
        <StarRating :rating="movie.movieRating" />
        <h4>{{ movie.movieTitle }}</h4>
      </li>
    </ul>
  </div>
</template>

<script>
import StarRating from "./StarRating.vue";
export default {
  data() {
    return {
      tabNumer: 0,
    };
  },
  props: {
    movies: Array,
  },
  computed: {
    movieList() {
      if (this.tabNumer === 0) {
        return this.movies;
      } else {
        return [];
      }
    },
  },
  components: { StarRating },
};
</script>

<style lang="scss" scoped>
.featured {
  position: relative;
}
.preview {
  position: absolute;
  right: 0;
}
.tab-header {
  display: flex;
  gap: 0 20px;
  font-size: 36px;
  font-weight: 700;
  padding-left: 20px;
  margin-bottom: 50px;
  > li {
    position: relative;
    cursor: pointer;
    &:after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      bottom: -10px;
      width: 0%;
      height: 3px;
      transition: 0.5s;
      background: #ed3124;
    }
    &:hover,
    &.on {
      &:after {
        width: 50%;
      }
    }
  }
}
</style>
