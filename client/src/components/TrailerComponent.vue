<template>
  <div class="trailer inner">
    <h2>예고편</h2>
    <div class="slider-container">
      <span
        class="arrow-left"
        v-if="currentSlide !== 0"
        @click="currentSlide--"
      >
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </span>
      <span
        class="arrow-right"
        @click="currentSlide++"
        v-if="currentSlide < trailers.length - 5 && trailers.length > 5"
      >
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </span>
      <ul
        class="trailer-list"
        :style="{ transform: `translateX(${-currentSlide * 377}px)` }"
      >
        <li
          v-for="(trailer, i) in trailers"
          :key="i"
          @click="$emit('videoOpen', i)"
        >
          <div class="video-wrapper">
            <img
              :src="`https://img.youtube.com/vi/${trailer.key}/0.jpg`"
              alt=""
            />
          </div>
          <div class="text-wrapper">
            <p>{{ trailer.name }}</p>
            <p>{{ dateChage(trailer.published_at) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trailers: Array,
  },
  data() {
    return {
      currentSlide: 0,
    };
  },
  methods: {
    dateChage(index) {
      const date = new Date(index).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return date;
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 40px;
}
.slider-container {
  position: relative;
  overflow: hidden;
  &:hover {
    .arrow-left,
    .arrow-right {
      opacity: 1;
    }
  }

  .arrow-left,
  .arrow-right {
    cursor: pointer;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 190px;
    z-index: 10;
    top: 0;
    font-size: 30px;
    transition: 0.2s;
    opacity: 0;
  }
  .arrow-left {
    left: 0;
    background: linear-gradient(
      -90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    );
  }
  .arrow-right {
    right: 0px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    );
  }
}
.trailer {
  .trailer-list {
    display: flex;
    gap: 40px;
    transition: 0.5s ease;
    > li {
      &:hover {
        .video-wrapper:after {
          display: block;
        }
      }
      .video-wrapper {
        width: 337px;
        overflow: hidden;
        height: 190px;
        border-radius: 10px;
        box-shadow: 0 4px 7px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        margin-bottom: 10px;
        position: relative;
        &:after {
          content: "";
          display: none;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba($color: #ffffff, $alpha: 0.4);
        }
      }
      .text-wrapper {
        width: 337px;
        font-size: 20px;
        color: rgba($color: #ffffff, $alpha: 0.8);
        p {
          margin-bottom: 20px;
          height: 60px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          &:last-child {
            margin-bottom: 0;
            font-size: 16px;
            height: auto;
            color: rgba($color: #ffffff, $alpha: 0.6);
          }
        }
      }
    }
  }
}
</style>
