<template>
  <section class="video-player">
    <div class="video-container">
      <div class="header">
        <span class="close-button" @click="$emit('videoClose')">
          <button>
            <font-awesome-icon :icon="['fas', 'xmark']" />
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
      </div>
      <span class="play-button">
        <button @click="videoControl" v-if="videoPlaying">
          <font-awesome-icon :icon="['fas', 'pause']" />
        </button>
        <button @click="videoControl" v-if="!videoPlaying">
          <font-awesome-icon :icon="['fas', 'play']" />
        </button>
      </span>

      <div id="youtube-player"></div>
      <div class="more-list" :class="{ on: !videoPlaying }">
        <ul>
          <li
            v-for="(trailer, i) in videoList"
            :key="i"
            @click="loadVideoById(trailer.key)"
          >
            <img
              :src="`https://img.youtube.com/vi/${trailer.key}/0.jpg`"
              alt=""
            />
          </li>
        </ul>
      </div>

      <div class="progress-bar" @click="seekVideo($event)">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    videoList: Array,
    nowPlaying: Number,
  },
  async mounted() {
    await this.checkIfYTLoaded();
    await this.createPlayer();
  },
  data() {
    return {
      videoPlaying: true,
      videoMuted: true,
      player: null,
      progress: 0,
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
      const videoId = this.videoList[this.nowPlaying].key;
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
      this.updateProgress();
    },
    onPlayerStateChange(event) {
      switch (event.data) {
        case window.YT.PlayerState.PLAYING:
          this.videoPlaying = true;
          this.updateProgress(); // 진행 상황 업데이트 메서드 호출
          break;
        case window.YT.PlayerState.PAUSED:
          this.videoPlaying = false;
          break;
      }
    },
    updateProgress() {
      const duration = this.player.getDuration();
      const currentTime = this.player.getCurrentTime();
      this.progress = (currentTime / duration) * 100;

      if (this.videoPlaying) {
        requestAnimationFrame(this.updateProgress);
      }
    },
    seekVideo(event) {
      const progressBar = event.target;
      const progressBarWidth = progressBar.offsetWidth;
      const clickPosition =
        event.clientX - progressBar.getBoundingClientRect().left;
      console.log(event.clientX, progressBarWidth);
      const seekTime =
        (clickPosition / progressBarWidth) * this.player.getDuration();
      this.player.seekTo(seekTime, true);
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
};
</script>

<style lang="scss" scoped>
.video-player {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 500;
  padding: 0;
}
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
.header {
  position: absolute;
  height: 60px;
  background: #000;
  width: 100%;
  z-index: 501;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
  .close-button,
  .speaker-button {
    width: 50px;
    height: 50px;
    position: relative;
    > button {
      all: unset;
      text-align: center;
      font-size: 26px;
      opacity: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      transition: 0.4s;
      text-shadow: 3px 3px 6px rgba($color: #000000, $alpha: 0.8);
      &:hover {
        opacity: 1;
        color: #ed3124;
      }
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
.progress-bar {
  position: absolute;
  bottom: 0;
  height: 10px;
  z-index: 501;
  width: 100%;
  background-color: #fff;
  .progress {
    height: 100%;
    background-color: #ed3124;
    transition: width 0.01s;
    pointer-events: none;
  }
}

.video-container {
  position: relative;
  height: 100%;
  overflow: hidden;
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
