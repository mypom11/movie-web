<template>
  <div class="inner">
    <h2>{{ title }}</h2>
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
        v-if="currentSlide < credit.length - 10 && credit.length > 10"
        @click="currentSlide++"
      >
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </span>
      <ul
        class="people"
        :style="{ transform: `translateX(${-currentSlide * 190}px)` }"
      >
        <li v-for="(people, i) in credit" :key="i">
          <div class="profile">
            <img
              draggable="false"
              v-if="people.profile_path !== null"
              :src="`https://image.tmdb.org/t/p/original/${people.profile_path}`"
              alt=""
            />
          </div>
          <h4>{{ people.name }}</h4>
          <p>{{ people.character }}</p>
          <p>{{ people.department }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    credit: Array,
    title: String,
  },
  data() {
    return {
      currentSlide: 0,
    };
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
    height: 160px;
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
.people {
  display: flex;
  gap: 30px;
  transition: 0.5s ease;
  transform: translateX(0);
  > li {
    text-align: center;
    .profile {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      overflow: hidden;
      background: #ccc;
      box-shadow: 0 7px 7px -5px rgba(0, 0, 0, 0.3);
      margin-bottom: 20px;
    }
    h4 {
      font-weight: 600;
      margin-bottom: 10px;
      color: rgba($color: #ffffff, $alpha: 0.8);
    }
    p {
      color: rgba($color: #ffffff, $alpha: 0.6);
    }
  }
}
</style>
