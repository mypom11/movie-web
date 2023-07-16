<template>
  <main>
    <p class="test">{{ scrollTop }}</p>

    <FirstSection
      :sectionHeight="setLayout(5)"
      :scrollTop="scrollTop"
      :prevScrollHeight="0"
    />
    <SecondSection
      :sectionHeight="setLayout(3)"
      :scrollTop="scrollTop"
      :prevScrollHeight="setLayout(5)"
    />
    <ThirdSection
      :sectionHeight="setLayout(4.5)"
      :scrollTop="scrollTop"
      :prevScrollHeight="setLayout(8)"
    />
    <ForthSection
      :sectionHeight="setLayout(1)"
      :scrollTop="scrollTop"
      :prevScrollHeight="setLayout(12.5)"
    />
  </main>
</template>

<script>
import SecondSection from "@/components/MainPage/SecondSection.vue";
import FirstSection from "@/components/MainPage/FirstSection.vue";
import ThirdSection from "@/components/MainPage/ThirdSection.vue";
import ForthSection from "@/components/MainPage/ForthSection.vue";

export default {
  name: "MainPage",
  data() {
    return {
      scrollTop: 0,
    };
  },
  methods: {
    getScrollTop() {
      this.scrollTop = window.pageYOffset;
    },
    setLayout(height) {
      //ex) 100vh ==> 1
      const sectionHeight = height * window.innerHeight;
      return sectionHeight;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.getScrollTop);
    window.addEventListener("resize", this.setLayout);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.getScrollTop);
    window.removeEventListener("resize", this.setLayout);
  },
  components: { FirstSection, SecondSection, ThirdSection, ForthSection },
};
</script>

<style lang="scss" scoped>
main {
  background: #000;
  min-height: 100vh;
  min-width: 100vw;
}
.last {
  height: 100vh;
}
.test {
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  font-size: 20px;
  font-weight: 600;
  color: red;
  z-index: 999;
}
</style>
