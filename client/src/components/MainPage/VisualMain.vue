<template>
  <div class="video-container">
    <div class="movie-title">
      <h2>{{ movieData.movieTitle }}</h2>
      <h4 v-html="movieData.movieDesc"></h4>

      <div class="button-group">
        <button class="custom red">예매하기</button>
        <button class="custom">상세보기</button>
      </div>
    </div>
    <span class="play-button">
      <button @click="videoControl" v-if="videoPlaying">
        <font-awesome-icon :icon="['fas', 'pause']" />
      </button>
      <button @click="videoControl" v-if="!videoPlaying">
        <font-awesome-icon :icon="['fas', 'play']" />
      </button>
    </span>
    <span class="speaker-button">
      <button v-if="videoMuted" @click="muteControl">
        <font-awesome-icon :icon="['fas', 'volume-high']" />
      </button>
      <button v-if="!videoMuted" @click="muteControl">
        <font-awesome-icon :icon="['fas', 'volume-xmark']" />
      </button>
    </span>
    <div id="youtube-player"></div>
    <div class="more-list" :class="{ on: !videoPlaying }">
      <ul>
        <li
          v-for="(movie, i) in movies"
          :key="i"
          @click="$emit('changeVisual', movie)"
        >
          <img :src="require(`@/assets/images/sample/${movie.movieImage}`)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.checkIfYTLoaded();
    await this.createPlayer();
  },
  data() {
    return {
      videoPlaying: true,
      videoMuted: true,
      player: null,
    };
  },
  methods: {
    checkIfYTLoaded() {
      if (window.YT && window.YT.Player) {
        return;
      }
      setTimeout(() => {
        this.checkIfYTLoaded();
      }, 100);
    },
    createPlayer() {
      const videoId = this.movieData.mainVideo;
      // eslint-disable-next-line no-undef
      this.player = new YT.Player("youtube-player", {
        height: 1920,
        width: 1080,
        videoId,
        playerVars: {
          rel: 0,
          enablejsapi: 1,
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          controls: 0,
          modestbranding: 0,
        },
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
        },
      });
    },
    onPlayerReady() {
      console.log("ready");
    },
    onPlayerStateChange(event) {
      switch (event.data) {
        case window.YT.PlayerState.PLAYING:
          this.videoPlaying = true;
          break;
        case window.YT.PlayerState.PAUSED:
          this.videoPlaying = false;
          break;
      }
    },
    videoControl() {
      this.videoPlaying ? this.player.pauseVideo() : this.player.playVideo();
    },
    muteControl() {
      this.videoMuted = this.player.isMuted();
      if (this.videoMuted) {
        this.player.unMute();
      } else {
        this.player.mute();
      }
      this.videoMuted = !this.videoMuted;
    },
    loadVideoById(id) {
      this.player.loadVideoById(id);
      this.player.loadPlaylist(id);
      this.player.setLoop(true);
    },
  },
  props: {
    movieData: Object,
    movies: Array,
  },
  watch: {
    movieData: {
      deep: true,
      immediate: false,
      handler() {
        this.loadVideoById(this.movieData.mainVideo);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.more-list {
  position: absolute;
  bottom: -200px;
  left: 0;
  padding: 20px;
  background: #000000;
  width: 100%;
  transition: 0.2s;
  z-index: 200;
  &.on {
    bottom: 0;
  }
  ul {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 0 20px;
    li {
      height: 150px;
      opacity: 0.5;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }
}
.speaker-button {
  position: absolute;
  right: 50px;
  top: 200px;
  z-index: 200;
  > button {
    all: unset;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    font-size: 30px;
    opacity: 1;
    cursor: pointer;
    transition: 0.4s;
    text-shadow: 3px 3px 6px rgba($color: #000000, $alpha: 0.8);
    &:hover {
      opacity: 1;
      color: #ed3124;
    }
  }
}
.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  > button {
    all: unset;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #fff;
    font-size: 40px;
    opacity: 0;
    cursor: pointer;
    transition: 0.4s;
    &:hover {
      opacity: 1;
      color: #ed3124;
      border: 1px solid #ed3124;
    }
  }
}
.movie-title {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50px;
  opacity: 0.2;
  transition: 0.5s;
  h2 {
    font-size: 60px;
    font-weight: 700;
    margin-bottom: 40px;
  }
  h4 {
    width: 700px;
    font-size: 24px;
    color: #ccc;
    margin-bottom: 40px;
  }
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  margin-bottom: 50px;
  &:hover {
    .movie-title {
      opacity: 1;
    }
    .play-button,
    .speaker-button {
      > button {
        opacity: 0.4;
      }
    }
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    height: 100%;
  }
  iframe,
  embed,
  object {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
