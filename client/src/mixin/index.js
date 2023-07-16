const mixin = {
  methods: {
    aniValue(values) {
      //values: [time-start,time-end,value-start,value-end]
      const currentYOffset = this.scrollTop - this.prevScrollHeight;
      const partScrollStart = values[0] * this.sectionHeight;
      const partScrollEnd = values[1] * this.sectionHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
      let resultValue;
      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        resultValue =
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[3] - values[2]) +
          values[2];
      } else if (currentYOffset < partScrollStart) {
        resultValue = values[2];
      } else if (currentYOffset > partScrollEnd) {
        resultValue = values[3];
      }
      return resultValue;
    },
    getRatio(value) {
      return this.sectionHeight * value;
    },
  },
};

export default mixin;
