<template>
  <section>
    <div class="inner">
      <h1>Previous Movies</h1>
      <div class="search-input">
        <input
          type="text"
          placeholder="영화제목을 입력하세요."
          :value="query"
          @input="changeQuery"
          @keydown.enter="getMovieList"
        />
        <button class="custom" @click="getMovieList">검색</button>
      </div>
      <ul class="movie-list">
        <li v-for="(movie, i) in searchResult" :key="i">
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
              :alt="movie.title"
            />
            <div class="button-group">
              <button class="custom">상세보기</button>
            </div>
          </div>
          <StarRating :rating="movie.vote_average" />
          <h4>{{ movie.title }}</h4>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import StarRating from "@/components/MainPage/StarRating.vue";
export default {
  components: {
    StarRating,
  },
  data() {
    return {
      searchResult: [],
      query: "",
    };
  },
  methods: {
    changeQuery(e) {
      this.query = e.target.value;
    },
    getMovieList() {
      const search = {
        query: this.query,
      };
      this.$axios
        .get("http://localhost:4000/api/previousMovies", {
          params: search,
        })
        .then((res) => {
          console.log(res);
          this.searchResult = [...res.data.list.results];
          return res;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  padding-top: 200px;
  text-align: center;
}
h1 {
  font-size: 80px;
  font-weight: 700;
  position: relative;
  width: fit-content;
  margin: 0 auto 100px;
  &::after {
    content: "";
    position: absolute;
    height: 5px;
    width: 100%;
    left: 0;
    bottom: -20px;
    background: #ed3124;
  }
}
.category {
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0 40px;
  > li {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      right: -20px;
      top: 50%;
      transform: translateY(-50%);
      height: 140%;
      width: 1px;
      background: #ccc;
    }
    &:last-child {
      &:after {
        display: none;
      }
    }
  }
  label {
    font-size: 18px;
    margin-right: 10px;
  }
  input {
    width: 160px;
    background: none;
    color: #fff;
    text-align: right;
    font-size: 24px;
    padding-bottom: 10px;
    padding-right: 10px;
    border-bottom: 1px solid #ed3124;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  select {
    width: 200px;
    background: none;
    text-align: right;
    font-size: 24px;
    padding-right: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ed3124;
  }
}
.search-input {
  input {
    background: none;
    border-bottom: 2px solid #ed3124;
    padding-right: 10px;
    margin-right: 30px;
    font-size: 24px;
    color: #fff;
    width: 500px;
    text-align: right;
    padding-bottom: 10px;
  }
}
.result-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 5%;
  > li {
    width: 15%;
  }
}
</style>
