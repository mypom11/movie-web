<template>
  <main v-if="loading">
    <section>
      <CoverFlow :movies="popularContent" title="인기 TV시리즈" :type="1" />
    </section>

    <section>
      <ListComponent
        title="한국 TV시리즈"
        :listData="koreaContent"
        desc
        :type="1"
      />
    </section>
    <section>
      <VisualComponent
        title="Wavve 인기 컨텐츠"
        :listData="wavvePopular"
        :type="1"
      />
    </section>
    <section>
      <ListComponent
        title="넷플릭스 인기 컨텐츠"
        :listData="netflixNew"
        :type="1"
        desc
      />
    </section>
    <section>
      <ListComponent
        title="애플티비+ 인기 컨텐츠"
        :listData="applePopular"
        :type="1"
      />
    </section>
    <section>
      <ListComponent
        title="디즈니플러스 인기 컨텐츠"
        :listData="disneyNew"
        :type="1"
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
  name: "TvMain",
  mounted() {
    this.getList();
  },
  data() {
    return {
      popularContent: [],
      koreaContent: [],
      wavvePopular: [],
      netflixNew: [],
      applePopular: [],
      disneyNew: [],
      loading: false,
    };
  },
  methods: {
    async getList() {
      try {
        const option1 = {
          with_origin_country: "KR",
        };
        const option2 = {
          with_watch_providers: 356,
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
        const url = `${process.env.VUE_APP_URL}/api/discover/tv`;

        const promises = [
          this.$axios.get(url),
          this.$axios.get(url, {
            params: option1,
          }),
          this.$axios.get(url, {
            params: option2,
          }),
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

        this.popularContent = [...res1.data.list.results];
        this.koreaContent = [...res2.data.list.results];
        this.wavvePopular = [...res3.data.list.results];
        this.netflixNew = [...res4.data.list.results];
        this.applePopular = [...res5.data.list.results];
        this.disneyNew = [...res6.data.list.results];

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
