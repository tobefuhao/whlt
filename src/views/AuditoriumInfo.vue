<template>
  <div class="auditoriumInfo">
    <img src="/img/top.jpg" class="top" alt="" />
    <ul class="nav clearfix">
      <li>最新动态</li>
      <li>基本介绍</li>
      <li>场地预约</li>
      <li>场地测评</li>
    </ul>
    <div class="content">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <div class="imgList">
          <img
            :src="img.url"
            alt=""
            v-for="(img, i) in JSON.parse(item.img)"
            :key="i"
          />
        </div>
        <h5>{{ item.title }}</h5>
        <p class="info clearfix">
          <span class="name">{{ item.userName }}</span>
          <span class="time">{{ $commonJs.getTime(item.intime) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auditoriumInfo {
  font-size: 14px; /*no*/
  [data-dpr="2"] & {
    font-size: 28px; /*no*/
  }
  [data-dpr="3"] & {
    font-size: 42px; /*no*/
  }
}
.top {
  width: 100%;
}
.nav {
  li {
    float: left;
    background: #6d9eeb;
    color: #fff;
    width: 93px;
    text-align: center;
    line-height: 30px;
    &:not(:last-child) {
      border-right: 1px solid #fff;
    }
  }
}
.item {
  background: #fff;
  padding: 16px;
  margin: 8px;
  .title {
    margin-bottom: 10px;
  }
  .imgList img {
    width: 100px;
  }
  .info {
    .name {
      float: left;
    }
    .time {
      float: right;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.auditorium();
  },
  methods: {
    auditorium() {
      this.axios
        .get(process.env.VUE_APP_URL + "/1.json")
        .then(response => {
          console.log(response);
          this.list = response.data.list;
        })
        .catch(() => {
          this.error = true;
        });
    }
  }
};
</script>