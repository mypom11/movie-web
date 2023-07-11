<template>
  <div class="star-ratings">
    <div class="star-ratings-fill" :style="{ width: ratingToPercent + '%' }">
      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
    </div>
    <div class="star-ratings-base">
      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rating: null,
  },
  data() {
    return {};
  },
  computed: {
    ratingToPercent() {
      const score = +this.rating * 10;
      return score + 1.5;
    },
  },
};
</script>

<style lang="scss" scoped>
.star-ratings {
  font-size: 16px;
  color: #fff;
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  margin: 0 auto;
}

.star-ratings-fill {
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: gold;
}

.star-ratings-base {
  z-index: 0;
  padding: 0;
}
</style>
