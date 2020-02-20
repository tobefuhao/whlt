<template>
  <div class="lm-list" ref="list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        class="news-item"
        v-for="(item, index) in list"
        :key="index"
        @click="article(item.topicId)"
      >
        <div class="news-item-left">
          <div class="info-top">
            <img :src="item.avatar" class="icon" alt="" />
            <p class="name">{{ item.userName }}</p>
          </div>
          <p class="title">{{ item.title }}</p>
          <div class="info">
            <div>
              <span>{{ getTownName(item.user_type, item.townName) }}</span>
              <!-- <p>{{ item.dis_count }} 评论</p> -->
              <!-- <p>{{ item.zan_count }} 点赞</p> -->
              <span
                >阅读
                {{
                  Number(item.basic_view) + Number(item.mult * item.view_count)
                }}</span
              >
            </div>
            <p class="time">{{ $commonJs.getTime(item.intime) }}</p>
          </div>
        </div>
        <!-- <div
          class="news-item-right"
          :style="{
            backgroundImage:
              'url(' +
              imgSiteUrl +
              parseFileName(item.img)[0] +
              ',w_330,h_330.' +
              parseFileName(item.img)[1] +
              ')'
          }"
        ></div> -->

        <div
          class="news-item-right"
          :style="{
            backgroundImage: 'url(' + parseJsonImg(item.img) + ')'
          }"
        ></div>
      </van-cell>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.news-list {
  margin-bottom: 1.333333rem;
}

.news-item {
  padding: 0;
  // margin: 8px 0;
  background: #fff;
}

.news-item > div {
  padding: 5px 10px;
  position: relative;

  .istop {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    z-index: 99;
  }

  .news-item-left {
    display: inline-block;
    vertical-align: top;
    width: 275px;

    .info-top {
      position: relative;
      display: flex;
      align-items: center;
      @include fontSize(12px);

      .icon {
        width: 20px;
        height: 20px;
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

  .news-item-right {
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
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
      imgSiteUrl: ""
    };
  },
  props: ["id", "index"],
  methods: {
    onLoad() {
      // this.imgSiteUrl = imgSiteUrl;
      this.axios
        // .post("/wechat/lanmuTieList", {
        .get(process.env.VUE_APP_URL + "/1.json", {
          form: {
            lanmuId: this.id,
            page: this.page++,
            pageSize: 10
          }
        })
        .then(response => {
          console.log(response);
          let data = response.data.list;
          // let data=response.data.lanmuTieList;
          this.list.push.apply(this.list, data);
          this.loading = false;
          if (data.length < 10) {
            this.finished = true;
          }
        })
        .catch(() => {
          this.error = true;
        });
    },
    getTownName(userType, townName) {
      //   let townName = this.townList[townId];
      if (userType == 2) {
        return townName + "头条号";
      } else {
        return "金华晚报";
      }
    },
    article(id) {
      this.$router.push({ name: "article", params: { id } });
    },
    parseFileName(fileName) {
      let a = [];
      a[0] = fileName.substring(0, fileName.lastIndexOf("."));
      a[1] = fileName.substr(fileName.lastIndexOf(".") + 1);
      return a;
    },

    parseJsonImg(jsonImg) {
      let img = JSON.parse(jsonImg);
      return img[0]["url"];
    }
  }
};
</script>
