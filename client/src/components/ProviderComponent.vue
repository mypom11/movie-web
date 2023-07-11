<template>
  <div class="inner">
    <h2>시청 방법</h2>
    <ul class="provider" v-if="provider">
      <li v-for="(provider, i) in provider.flatrate" :key="i">
        <div class="logo" :class="`logo-${provider.provider_id}`">
          <img
            :src="require(`@/assets/images/logo_${provider.provider_id}.png`)"
            alt=""
          />
        </div>
        <p>{{ providerName[`${provider.provider_id}`] }} - 스트리밍</p>
      </li>
      <li v-for="(provider, i) in provider.buy" :key="i">
        <div class="logo" :class="`logo-${provider.provider_id}`">
          <img
            :src="require(`@/assets/images/logo_${provider.provider_id}.png`)"
            alt=""
          />
        </div>
        <p>{{ providerName[`${provider.provider_id}`] }} - 구입</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    provider: Object,
  },
  data() {
    return {
      providerName: {
        3: "구글 플레이",
        8: "넷플릭스",
        96: "네이버 시리즈온",
        97: "왓챠",
        337: "디즈니 플러스",
        350: "애플TV+",
        356: "웨이브",
      },
    };
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 40px;
}
.provider {
  display: flex;
  gap: 40px;
  > li {
    width: 337px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.25);
    .logo {
      height: 200px;
      position: relative;
      background: #000;
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 70%;
        height: auto;
      }
      &.logo-3 {
        background: #fff;
      }
      &.logo-96 {
        background: #000;
        img {
          width: 100%;
        }
      }
      &.logo-337 {
        background: #030f40;
      }
    }
    p {
      height: 80px;
      background: #202020;
      line-height: 80px;
      padding-left: 20px;
      font-size: 20px;
      font-weight: 600;
      color: rgba($color: #fff, $alpha: 0.8);
    }
  }
}
</style>
