<template>
  <div class="auditoriumInfo">
    <img src="/img/top.jpg" class="top" alt="" />
    <ul class="nav clearfix">
      <li>最新动态</li>
      <li @click="show = true">基本介绍</li>
      <li>场地预约</li>
      <li>场地测评</li>
    </ul>
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="article(item.topicId)"
      >
        <p class="title">{{ item.title }}</p>
        <div class="imgList clearfix">
          <img
            :src="img.url"
            alt=""
            v-for="(img, i) in JSON.parse(item.img)"
            :key="i"
          />
        </div>
        <p class="info clearfix">
          <span class="name">{{ item.userName }}</span>
          <span class="time">{{ $commonJs.getTime(item.intime) }}</span>
        </p>
      </div>
    </div>
    <van-action-sheet
      v-model="show"
      style="height:80%"
      :title="info.name + '文化礼堂简介'"
    >
      <p>{{ info.content }}</p>
    </van-action-sheet>
  </div>
</template>

<style lang="scss" scoped>
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
    font-size: 14px; /*no*/
    [data-dpr="2"] & {
      font-size: 28px; /*no*/
    }
    [data-dpr="3"] & {
      font-size: 42px; /*no*/
    }
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
    font-size: 16px; /*no*/
    [data-dpr="2"] & {
      font-size: 18px; /*no*/
    }
    [data-dpr="3"] & {
      font-size: 30px; /*no*/
    }
  }
  .imgList img {
    width: 98px;
    margin: 5px;
    float: left;
  }
  .info {
    .name {
      float: left;
      font-size: 14px; /*no*/
      [data-dpr="2"] & {
        font-size: 28px; /*no*/
      }
      [data-dpr="3"] & {
        font-size: 42px; /*no*/
      }
    }
    .time {
      float: right;
      font-size: 14px; /*no*/
      [data-dpr="2"] & {
        font-size: 28px; /*no*/
      }
      [data-dpr="3"] & {
        font-size: 42px; /*no*/
      }
    }
  }
}
.van-action-sheet__header {
  font-weight: bold;
  & p {
    font-size: 18px; /*no*/
    [data-dpr="2"] & {
      font-size: 25px; /*no*/
    }
    [data-dpr="3"] & {
      font-size: 40px; /*no*/
    }
  }
}
.van-action-sheet__content {
  padding: 0px 16px;
  & p {
    font-size: 16px; /*no*/
    [data-dpr="2"] & {
      font-size: 25px; /*no*/
    }
    [data-dpr="3"] & {
      font-size: 42px; /*no*/
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      list: [],
      show: false,
      info: {
        name: "高塘村",
        content:
          "近日，塘头村热闹非凡，一场由婺城区文化体育新闻出版局主办的“金华棋王”围棋争霸赛在塘头村文化礼堂鏖战正酣。近日，塘头村热闹非凡，一场由婺城区文化体育新闻出版局主办的“金华棋王”围棋争霸赛在塘头村文化礼堂鏖战正酣。"
      }
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
    },
    article(id) {
      this.$router.push({ name: "article", params: { id } });
    }
  }
};
</script>