<template>
  <section v-if="loading">
    <div
      class="visual inner"
      :style="{
        background: `no-repeat center/100% url(https://image.tmdb.org/t/p/original/${tvDetail.detail.backdrop_path})`,
      }"
      v-if="loading"
    >
      <div class="text-container">
        <h2>{{ tvDetail.detail.name }}</h2>
        <ul class="season-tab">
          <li
            v-for="num in seasonTab"
            :key="num"
            :class="{ on: selectedSeason === num }"
            @click="selectedSeason = num"
          >
            <h4>시즌 {{ num }}</h4>
          </li>
        </ul>
        <div class="movie-desc">
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/original/${tvDetail.detail.poster_path}`"
              alt=""
            />
          </div>
          <div class="movie-overview">
            <h6>
              {{ tvDetail.detail.overview }}
            </h6>
            <p class="genre">
              <b v-for="(genre, i) in tvDetail.detail.genres" :key="i">
                {{ genre.name }}
              </b>
            </p>
          </div>
          <div class="credit">
            <p v-if="tvDetail.credit.cast.length !== 0">
              출연
              <b v-for="(actor, i) in mainActor" :key="i">{{ actor.name }}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
    <article>
      <TvEpisode :season="selectedSeason" />
    </article>
    <article v-if="tvDetail.video.length !== 0">
      <hr class="inner" />
      <TrailerComponent :trailers="tvDetail.video" @videoOpen="videoOpen" />
    </article>
    <article v-if="tvDetail.credit.cast.length !== 0">
      <hr class="inner" />
      <PeopleComponent :credit="tvDetail.credit.cast" title="출연진" />
    </article>
    <article v-if="tvDetail.credit.crew.length !== 0">
      <hr class="inner" />
      <PeopleComponent :credit="tvDetail.credit.crew" title="제작진" />
    </article>
    <article v-if="tvDetail.provider">
      <hr class="inner" />
      <ProviderComponent :provider="useProvider" />
    </article>

    <div class="info-footer">
      <div class="inner">
        <div class="content-desc">
          <h2>컨텐츠 설명</h2>
          <div class="content-box">
            <h3>{{ tvDetail.detail.name }}</h3>
            <h5>
              <b v-for="(genre, i) in tvDetail.detail.genres" :key="i">
                {{ genre.name }}
              </b>
            </h5>
            <p>{{ tvDetail.detail.overview }}</p>
          </div>
        </div>
        <hr />
        <div>
          <h2>정보</h2>
          <ul class="content-info">
            <li>
              <h3>원제</h3>
              <p>{{ tvDetail.detail.original_name }}</p>
            </li>
            <li>
              <h3>방영 시작일</h3>
              <p>{{ tvDetail.detail.first_air_date }}</p>
            </li>
            <li>
              <h3>마지막 방영일</h3>
              <p>{{ tvDetail.detail.last_air_date }}</p>
            </li>
            <li>
              <h3>유저 평점</h3>
              <p>{{ tvDetail.detail.vote_average }}</p>
            </li>
            <li>
              <h3>총 투표수</h3>
              <p>{{ tvDetail.detail.vote_count }}</p>
            </li>
            <li>
              <h3>제작 오디오</h3>
              <p>{{ iso.getName(tvDetail.detail.original_language) }}</p>
            </li>
            <li>
              <h3>제작 회사</h3>
              <p>
                <b
                  v-for="(company, i) in tvDetail.detail.production_companies"
                  :key="i"
                  >{{ company.name }}</b
                >
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <VideoPlayer
        :videoList="tvDetail.video"
        v-if="videoPlaying"
        :nowPlaying="nowPlaying"
        @videoClose="videoClose"
      />
    </transition>
  </section>
</template>

<script>
import ProviderComponent from "@/components/ProviderComponent.vue";
import PeopleComponent from "@/components/PeopleComponent.vue";
import TrailerComponent from "@/components/TrailerComponent.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import TvEpisode from "@/components/TvEpisode.vue";
import ISO6391 from "iso-639-1";

const iso = ISO6391;
export default {
  mounted() {
    this.getTvDetail(this.$route.query.id);
  },
  data() {
    return {
      nowPlaying: 0,
      videoPlaying: false,
      tvDetail: {},
      loading: false,
      mainActor: [],
      useProvider: {},
      iso,
      seasonTab: [],
      selectedSeason: 0,
    };
  },
  methods: {
    getTvDetail(id) {
      this.$axios
        .get(`${process.env.VUE_APP_URL}/api/tv/detail`, { params: { id } })
        .then((res) => {
          this.tvDetail = { ...res.data };
          this.selectedSeason = res.data.detail.number_of_seasons;
          this.makeTab(this.selectedSeason);
          res.data.credit.cast.forEach((item, i) => {
            if (i <= 10) {
              this.mainActor.push(item);
            }
          });
          if (res.data.provider) {
            this.getUseProvider(res.data.provider);
          }
          this.loading = true;
          return res;
        });
    },
    videoOpen(num) {
      this.nowPlaying = num;
      this.videoPlaying = true;
    },
    videoClose() {
      this.videoPlaying = false;
    },
    getUseProvider(data) {
      const usePoviderId = [3, 8, 96, 97, 337, 350, 356];
      let buy, flatrate;
      if (data.buy) {
        buy = data.buy.filter((provider) =>
          usePoviderId.includes(provider.provider_id)
        );
      }
      if (data.flatrate) {
        flatrate = data.flatrate.filter((provider) =>
          usePoviderId.includes(provider.provider_id)
        );
      }

      this.useProvider = { buy, flatrate };
    },
    makeTab(season) {
      for (let i = 1; i > 0 && i <= season; i++) {
        this.seasonTab.push(i);
      }
    },
  },
  computed: {},
  components: {
    PeopleComponent,
    TrailerComponent,
    VideoPlayer,
    ProviderComponent,
    TvEpisode,
  },
};
</script>

<style lang="scss" scoped>
section {
  padding-top: 60px;
  hr {
    height: 1px;
    background: #383838;
    margin: 40px auto;
  }
  h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 40px;
  }
  > div {
    padding: 0 0 0 40px;
  }
}
.season-tab {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  max-width: 700px;
  flex-wrap: wrap;
  li {
    cursor: pointer;
    h4 {
      font-size: 20px;
      font-weight: 600;
      color: rgba($color: #fff, $alpha: 0.6);
      text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
    }
    &.on,
    &:hover {
      h4 {
        color: #fff;
      }
    }
  }
}
.visual {
  background: #ccc;
  height: 1080px;
  border-radius: 0 0 10px 10px;
  position: relative;
  padding: 0;
  margin-bottom: 50px;
  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.9) 85%,
      rgba(0, 0, 0, 1) 100%
    );
  }
  .text-container {
    position: absolute;
    z-index: 50;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 50px;

    h2 {
      font-size: 72px;
      font-weight: 900;
      color: rgba($color: #ffffff, $alpha: 0.8);
      text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
      margin-bottom: 20px;
    }
    .movie-desc {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 50px;
      display: flex;
      justify-content: space-between;
      height: 300px;
      gap: 1%;

      .movie-img {
        position: relative;
        width: 18%;
        img {
          position: absolute;
          width: 80%;
          height: auto;
          left: 0;
          bottom: 0;
          opacity: 0.5;
        }
      }
      .genre {
        position: absolute;
        bottom: 0;
        color: rgba($color: #ffffff, $alpha: 0.6);
        b {
          font-weight: 400;
          &:last-child {
            &:after {
              display: none;
            }
          }
          &:after {
            content: "";
            vertical-align: middle;
            display: inline-block;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: rgba($color: #ffffff, $alpha: 0.6);
            margin: 8px;
          }
        }
      }
      .movie-overview {
        width: 68%;
        font-size: 18px;
        line-height: 1.5;
        color: rgba($color: #ffffff, $alpha: 0.8);
        position: relative;
        h6 {
          font-size: 16px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 6;
        }
      }
      .credit {
        width: 20%;
        p {
          font-weight: 500;
          color: rgba($color: #ffffff, $alpha: 0.6);
          font-size: 20px;
          b {
            font-size: 16px;
            color: rgba($color: #ffffff, $alpha: 0.8);
            font-weight: 400;
            &:first-child {
              margin-left: 10px;
            }
            &:last-child {
              &::after {
                display: none;
              }
            }
            &:after {
              content: ",";
              display: inline;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}

.info-footer {
  margin-top: 200px;
  background: #1f1f1f;
  padding: 50px 0;
  .content-desc {
    padding: 20px 0;
    .content-box {
      background: #363636;
      width: 800px;
      padding: 20px;
      border-radius: 10px;
      h3 {
        font-size: 30px;
        font-weight: 600;
        color: #fff;
      }
      h5 {
        padding: 20px 0;
        font-size: 18px;
        color: rgba($color: #ffffff, $alpha: 0.6);
        b {
          font-weight: 400;
          &:last-child {
            &:after {
              display: none;
            }
          }
          &:after {
            content: "";
            vertical-align: middle;
            display: inline-block;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: rgba($color: #ffffff, $alpha: 0.6);
            margin: 8px;
          }
        }
      }
      p {
        font-size: 20px;
        line-height: 1.6;
        color: rgba($color: #ffffff, $alpha: 0.8);
      }
    }
  }
  .content-info {
    display: flex;
    flex-wrap: wrap;
    gap: 50px 0;
    > li {
      width: 25%;
      h3 {
        margin-bottom: 10px;
        color: rgba($color: #ffffff, $alpha: 0.6);
      }
      p {
        b {
          font-weight: 400;
          display: block;
        }
        color: rgba($color: #ffffff, $alpha: 0.4);
      }
    }
  }
}
</style>
