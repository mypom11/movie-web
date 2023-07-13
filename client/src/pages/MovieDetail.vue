<template>
  <section v-if="loading">
    <div
      class="visual inner"
      :style="{
        background: `no-repeat center/100% url(https://image.tmdb.org/t/p/original/${movieDetail.detail.backdrop_path})`,
      }"
      v-if="loading"
    >
      <div class="video-container"></div>
      <div class="text-container">
        <h2>{{ movieDetail.detail.title }}</h2>
        <div class="movie-desc">
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/original/${movieDetail.detail.poster_path}`"
              alt=""
            />
          </div>
          <div class="movie-overview">
            <h6>
              {{ movieDetail.detail.overview }}
            </h6>
            <p class="genre">
              <b v-for="(genre, i) in movieDetail.detail.genres" :key="i">
                {{ genre.name }}
              </b>
            </p>
          </div>
          <div class="credit">
            <p v-if="movieDetail.credit.crew.length !== 0">
              출연
              <b v-for="(actor, i) in mainActor" :key="i">{{ actor.name }}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
    <article v-if="movieDetail.video.length !== 0">
      <TrailerComponent :trailers="movieDetail.video" @videoOpen="videoOpen" />
    </article>
    <article v-if="movieDetail.credit.crew.length !== 0">
      <hr class="inner" />
      <PeopleComponent :credit="movieDetail.credit.cast" title="출연진" />
    </article>
    <article v-if="movieDetail.credit.crew.length !== 0">
      <hr class="inner" />
      <PeopleComponent :credit="movieDetail.credit.crew" title="제작진" />
    </article>
    <article v-if="movieDetail.provider">
      <hr class="inner" />
      <ProviderComponent :provider="useProvider" />
    </article>

    <div class="info-footer">
      <div class="inner">
        <div class="content-desc">
          <h2>컨텐츠 설명</h2>
          <div class="content-box">
            <h3>{{ movieDetail.detail.title }}</h3>
            <h5>
              <b v-for="(genre, i) in movieDetail.detail.genres" :key="i">
                {{ genre.name }}
              </b>
            </h5>
            <p>{{ movieDetail.detail.overview }}</p>
          </div>
        </div>
        <hr />
        <div>
          <h2>정보</h2>
          <ul class="content-info">
            <li>
              <h3>원제</h3>
              <p>{{ movieDetail.detail.original_title }}</p>
            </li>
            <li>
              <h3>개봉일</h3>
              <p>{{ movieDetail.detail.release_date }}</p>
            </li>
            <li>
              <h3>영상 시간</h3>
              <p>{{ movieDetail.detail.runtime }}분</p>
            </li>
            <li>
              <h3>현재 상태</h3>
              <p>{{ movieDetail.detail.status }}</p>
            </li>
            <li>
              <h3>유저 평점</h3>
              <p>{{ movieDetail.detail.vote_average }}</p>
            </li>
            <li>
              <h3>총 투표수</h3>
              <p>{{ movieDetail.detail.vote_count }}</p>
            </li>
            <li>
              <h3>제작 오디오</h3>
              <p>{{ iso.getName(movieDetail.detail.original_language) }}</p>
            </li>
            <li>
              <h3>제작 회사</h3>
              <p>
                <b
                  v-for="(company, i) in movieDetail.detail
                    .production_companies"
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
        :videoList="movieDetail.video"
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
import ISO6391 from "iso-639-1";

const iso = ISO6391;
export default {
  mounted() {
    this.getMovieDetail(this.$route.query.id);
  },
  data() {
    return {
      nowPlaying: 0,
      videoPlaying: false,
      movieDetail: {},
      loading: false,
      mainActor: [],
      useProvider: {},
      iso,
    };
  },
  methods: {
    getMovieDetail(id) {
      this.$axios
        .get("http://localhost:4000/api/movie/detail", { params: { id } })
        .then((res) => {
          console.log(res);
          this.movieDetail = { ...res.data };
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
  },
  computed: {},
  components: {
    PeopleComponent,
    TrailerComponent,
    VideoPlayer,
    ProviderComponent,
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
      rgba(0, 0, 0, 0.1) 0%,
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
    display: flex;
    justify-content: space-between;

    h2 {
      font-size: 72px;
      font-weight: 900;
      color: rgba($color: #ffffff, $alpha: 0.8);
      text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
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
