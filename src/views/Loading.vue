<template>
  <div class="loading">
    <img src="@assets/images/4.jpg" alt="" />
    <p class="countDown">{{ countDown }}S</p>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: relative;
}
.countDown {
  position: absolute;
  right: 30px;
  top: 30px;
  background: rgba($color: #000000, $alpha: 0.3);
  border-radius: 5px;
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  font-size: 16PX; /*no*/
  [data-dpr="2"] & {
    font-size: 32PX; /*no*/
  }
  [data-dpr="3"] & {
    font-size: 48PX; /*no*/
  }
}
img {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      countDown: "5"
    };
  },
  mounted() {
    setInterval(() => {
      this.countDown--;
    }, 1000);
    setTimeout(() => {
      this.$router.push({ name: "home" });
    }, 5000);
  }
};
</script>
