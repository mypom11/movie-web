<template>
  <section ref="scrollContainer">
    <div class="inner">
      <!-- <ul class="tab">
        <li :class="{ on: type === 0 }" @click="type = 0">영화</li>
        <li :class="{ on: type === 1 }" @click="type = 1">TV시리즈</li>
      </ul> -->
      <div class="search-input">
        <input
          type="text"
          placeholder="제목을 입력하세요."
          :value="query"
          @input="changeQuery"
          @keydown.enter="getMovieList"
        />
        <button class="custom" @click="getMovieList">검색</button>
      </div>
      <ul class="movie-list">
        <li v-for="(result, i) in searchResult.results" :key="i">
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/original/${result.poster_path}`"
            />
            <div class="button-group">
              <button class="custom" @click="moveDetail(result)">
                상세보기
              </button>
            </div>
          </div>
          <StarRating :rating="result.vote_average" />
          <h4>{{ result.title }}</h4>
          <h4>{{ result.name }}</h4>
        </li>
      </ul>
      <hr ref="list" />
    </div>
  </section>
</template>

<script>
import StarRating from "@/components/StarRating.vue";
export default {
  name: "SearchMain",
  mounted() {},
  components: {
    StarRating,
  },
  data() {
    return {
      type: 0,
      searchResult: {},
      query: "",
    };
  },
  methods: {
    changeQuery(e) {
      this.query = e.target.value;
    },
    moveDetail(data) {
      if (data.title) {
        this.$router.push({ name: "MovieDetail", query: { id: `${data.id}` } });
      } else {
        this.$router.push({ name: "TvDetail", query: { id: `${data.id}` } });
      }
    },
    getMovieList() {
      this.$axios
        .get(`${process.env.VUE_APP_URL}/api/search`, {
          params: {
            query: this.query,
          },
        })
        .then((res) => {
          this.searchResult = { ...res.data.list };
          return res;
        });
    },
    moreData() {
      if (this.searchResult.total_page != this.searchResult.page)
        this.$axios
          .get(`${process.env.VUE_APP_URL}/api/search`, {
            params: {
              query: this.query,
              page: Number(this.searchResult.page) + 1,
            },
          })
          .then((res) => {
            this.searchResult = { ...this.searchResult, ...res.data.list };
            return res;
          });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  padding-top: 60px;
  text-align: center;
}
.inner {
  margin-top: 50px;
}
hr {
  height: 1px;
  background: #383838;
  margin: 40px auto;
}
.tab {
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: rgba($color: #ffffff, $alpha: 0.6);
  margin-bottom: 20px;
  cursor: pointer;
  > li {
    &:hover,
    &.on {
      color: rgba($color: #ffffff, $alpha: 1);
    }
  }
}
.search-input {
  input {
    background: none;
    border-bottom: 1px solid #fff;
    margin-right: 10px;
    font-size: 20px;
    color: #fff;
    width: 300px;
    padding: 5px 10px;
  }
  .custom {
    width: 100px;
    font-size: 20px;
    height: 36px;
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
