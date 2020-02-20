<template>
  <div class="auditoriumInfo">
    <div class="loading" v-show="flag">
      <img src="@assets/images/4.jpg" alt="" />
      <p class="countDown" @click="onClick">{{ countDown }} 跳过</p>
    </div>
    <img src="img/top.jpg" class="top" alt="" />
    <ul class="nav clearfix">
      <li @click="contentFlag = true">最新动态</li>
      <li @click="show = true">基本介绍</li>
      <li @click="contentFlag = false">礼堂故事</li>
      <li>场地测评</li>
    </ul>
    <div class="content">
      <div v-show="contentFlag">
        <van-cell
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="article(item.topicId)"
        >
          <div class="item-left">
            <!-- <div class="info-top">
              <img :src="item.avatar" class="icon" alt="" />
              <p class="name">{{ item.userName }}</p>
            </div> -->
            <p class="title van-multi-ellipsis--l2">{{ item.title }}</p>
            <p class="time">{{ $commonJs.getTime(item.intime) }}</p>
          </div>
          <div
            class="item-right"
            :style="{
              backgroundImage: 'url(' + JSON.parse(item.img)[0].url + ')'
            }"
          ></div>
        </van-cell>
        <!-- <div
          class="news-item"
          v-for="(item, index) in list"
          :key="index"
          @click="article(item.topicId)"
        >
          <p class="title van-multi-ellipsis--l2">{{ item.title }}</p>
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
        </div> -->
      </div>

      <div v-show="!contentFlag">
        <van-cell
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="article(item.topicId)"
        >
          <div class="item-left">
            <div class="info-top">
              <img :src="item.avatar" class="icon" alt="" />
              <p class="name">{{ item.userName }}</p>
            </div>
            <p class="title van-multi-ellipsis--l2">{{ item.title }}</p>
          </div>
          <div
            class="item-right"
            :style="{
              backgroundImage: 'url(' + JSON.parse(item.img)[0].url + ')'
            }"
          ></div>
        </van-cell>
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
.loading {
  position: relative;
  z-index: 999;

  img {
    position: fixed;
    width: 100%;
    height: 100%;
  }
}
.countDown {
  position: absolute;
  right: 30px;
  top: 30px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  @include fontSize(16px);
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
    @include fontSize(14px);
    &:not(:last-child) {
      border-right: 1px solid #fff;
    }
  }
}
// .news-item {
//   background: #fff;
//   padding: 16px;
//   margin: 8px;
//   .title {
//     margin-bottom: 10px;
//     @include fontSize(14px);
//   }
//   .imgList img {
//     width: 98px;
//     margin: 5px;
//     float: left;
//   }
//   .info {
//     .name {
//       float: left;
//       @include fontSize(12px);
//     }
//     .time {
//       float: right;
//       @include fontSize(12px);
//     }
//   }
// }
.van-action-sheet__header {
  font-weight: bold;
  & p {
    @include fontSize(18px);
  }
}
.van-action-sheet__content {
  padding: 0px 16px;
  & p {
    @include fontSize(16px);
  }
}
.item:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.item > div {
  position: relative;
  .time {
    @include fontSize(12px);
  }
  .item-left {
    display: inline-block;
    vertical-align: top;
    width: 250px;

    .info-top {
      position: relative;
      display: flex;
      align-items: center;
      @include fontSize(12px);

      .icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 0;
      }

      .name {
        color: #acacac;
        margin-left: 8px;
        width: 125px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }

    .title {
      color: #323233;
      // height: 50px;
      @include fontSize(14px);

      margin-bottom: 6px;
    }
  }

  .item-right {
    display: inline-block;
    width: 70px;
    height: 70px;
    margin-left: 10px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #acacac;
    @include fontSize(12px);

    span {
      margin-right: 8px;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      flag: true,
      countDown: "5",
      countInterval: "",
      list: [],
      show: false,
      contentFlag: true,
      info: {
        name: "高塘村",
        content:
          "近日，塘头村热闹非凡，一场由婺城区文化体育新闻出版局主办的“金华棋王”围棋争霸赛在塘头村文化礼堂鏖战正酣。近日，塘头村热闹非凡，一场由婺城区文化体育新闻出版局主办的“金华棋王”围棋争霸赛在塘头村文化礼堂鏖战正酣。"
      }
    };
  },
  mounted() {
    this.auditorium();
    this.countInterval = setInterval(() => {
      this.countDown--;
    }, 1000);
    setTimeout(() => {
      this.flag = false;
      clearInterval(this.countInterval);
    }, 5000);
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
    },
    onClick() {
      this.flag = false;
      clearInterval(this.countInterval);
    }
  }
};
</script>
