<template>
  <main v-if="loading">
    <section>
      <CoverFlow :movies="nowRelease" title="현재 상영작" :type="0" />
    </section>

    <section>
      <ListComponent
        title="상영 예정작"
        :listData="willRelease"
        desc
        :type="0"
      />
    </section>
    <section>
      <VisualComponent title="인기 컨텐츠" :listData="moviePopular" :type="0" />
    </section>
    <section>
      <ListComponent
        title="넷플릭스 인기 컨텐츠"
        :listData="netflixPopular"
        :type="0"
        desc
      />
    </section>
    <section>
      <ListComponent
        title="애플티비+ 인기 컨텐츠"
        :listData="applePopular"
        :type="0"
      />
    </section>
    <section>
      <ListComponent
        title="디즈니플러스 인기 컨텐츠"
        :listData="disneyPopular"
        :type="0"
        desc
      />
    </section>
  </main>
  <LoadingComponent v-if="!loading" />
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent.vue";
import ListComponent from "@/components/ListComponent.vue";
import VisualComponent from "@/components/VisualComponent.vue";
import CoverFlow from "@/components/CoverFlow.vue";
export default {
  name: "MovieMain",
  mounted() {
    this.getList();
  },
  data() {
    return {
      nowRelease: [],
      willRelease: [],
      moviePopular: [],
      netflixPopular: [],
      applePopular: [],
      disneyPopular: [],
      loading: false,
    };
  },
  methods: {
    async getList() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const day = today.getDate();
      const url = `${process.env.VUE_APP_URL}/discover/movie`;
      const option = {
        "release_date.gte": new Date(year, month - 1, day),
        "release_date.lte": today,
        with_release_type: 3,
      };
      const option2 = {
        "release_date.gte": today,
        "release_date.lte": new Date(year, month + 1, day),
        with_release_type: 3,
        sort_by: "primary_release_date.asc",
      };
      const option4 = {
        with_watch_providers: 8,
      };
      const option5 = {
        with_watch_providers: 350,
      };
      const option6 = {
        with_watch_providers: 337,
      };

      try {
        const promises = [
          this.$axios.get(url, {
            params: option,
          }),
          this.$axios.get(url, {
            params: option2,
          }),
          this.$axios.get(url),
          this.$axios.get(url, {
            params: option4,
          }),
          this.$axios.get(url, {
            params: option5,
          }),
          this.$axios.get(url, {
            params: option6,
          }),
        ];

        const [res1, res2, res3, res4, res5, res6] = await Promise.all(
          promises
        );

        this.nowRelease = [...res1.data.list.results];
        this.willRelease = [...res2.data.list.results];
        this.moviePopular = [...res3.data.list.results];
        this.netflixPopular = [...res4.data.list.results];
        this.applePopular = [...res5.data.list.results];
        this.disneyPopular = [...res6.data.list.results];

        this.loading = true;
      } catch (error) {
        console.error(error);
      }
    },
  },
  components: {
    CoverFlow,
    ListComponent,
    VisualComponent,
    LoadingComponent,
  },
};
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 40px;
}
</style>
