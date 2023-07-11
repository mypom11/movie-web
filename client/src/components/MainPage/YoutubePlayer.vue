<template>
  <div>
    <div id="youtube-player"></div>
  </div>
</template>

<script>
export default {
  props: {
    videoId: String,
  },
  async mounted() {
    await this.loadAPI();
    await this.checkIfYTLoaded();
    this.createPlayer();
  },
  data() {
    return {
      player: null,
    };
  },
  methods: {
    loadAPI() {
      if (
        document.querySelector(
          "script[src='https://www.youtube.com/iframe_api']"
        )
      ) {
        return;
      }
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      console.info("Youtube API script added to the HTML document.");
      return;
    },
    checkIfYTLoaded() {
      if (window.YT && window.YT.Player) {
        return;
      }
      // recursively check if the YT object is loaded
      // eslint-disable-next-line no-unused-vars

      setTimeout(() => {
        this.checkIfYTLoaded();
      }, 100);
    },
    createPlayer() {
      // eslint-disable-next-line no-undef
      this.player = new YT.Player("youtube-player", {
        height: 1920,
        width: 1080,
        videoId: this.videoID,
        playerVars: {
          rel: 0,
          enablejsapi: 1,
          version: 3,
          platerapiid: "ytplayer",
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: this.videoId,
          controls: 0,
          modestbranding: 0,
        },
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
          //   onPlaybackQualityChange: onPlaybackQualityChange,
          //   onPlaybackRateChange: onPlaybackRateChange,
          //   onError: onError,
          //   onApiChange: onApiChange,
        },
      });
    },
    onPlayerReady() {
      console.log("ready");
    },
    onStateChange() {
      console.log("state");
    },
    stopVideo() {
      this.player.stopVideo;
    },
  },
};
</script>
