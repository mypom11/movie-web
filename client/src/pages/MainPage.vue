<template>
  <main>
    <CoverFlow
      :movies="movieResult"
      title="인기 영화"
      v-if="loading"
      :type="0"
    />
    <CoverFlow
      :movies="tvResult"
      title="인기 TV시리즈"
      v-if="loading"
      :type="1"
    />
  </main>
</template>

<script>
import CoverFlow from "@/components/MainPage/CoverFlow.vue";
export default {
  mounted() {
    this.getList();
  },
  data() {
    return {
      movieResult: [],
      tvResult: [],
      movieDetail: [],
      loading: false,
    };
  },
  methods: {
    async getList() {
      await this.$axios
        .get("http://localhost:4000/api/discover/movie")
        .then((res) => {
          this.movieResult = [...res.data.list.results];
          return res;
        });
      await this.$axios
        .get("http://localhost:4000/api/discover/tv")
        .then((res) => {
          console.log(res);
          this.tvResult = [...res.data.list.results];
          return res;
        });
      this.loading = true;
    },
  },
  components: {
    CoverFlow,
  },
};
</script>

<style lang="scss" scoped></style>
