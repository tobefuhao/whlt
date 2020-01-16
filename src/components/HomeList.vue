<template>
  <div id="news-list" class="news-list">
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
        <img
          src="../assets/images/istop.png"
          class="istop"
          v-if="item.is_top == 1"
          alt=""
        />
        <div class="news-item-left">
          <div class="info-top">
            <img :src="item.avatar" class="icon" alt="" />
            <p class="name">{{ item.userName }}</p>
          </div>
          <p class="title">{{ item.title }}</p>
          <div class="info">
            <div>
              <span>{{ item.townName }}</span>
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
            backgroundImage: 'url(' + imgSiteUrl + parseAdminImg(item.img) + ')'
          }"
          v-if="item.user_id == 1"
        ></div>
        <div
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
          v-if="item.user_id != 1"
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
    width: 265px;

    .info-top {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 12PX; /*no*/
      [data-dpr="2"] & {
        font-size: 24PX; /*no*/
      }

      [data-dpr="3"] & {
        font-size: 36PX; /*no*/
      }

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
      height: 45px;
      font-size: 14PX; /*no*/
      [data-dpr="2"] & {
        font-size: 28PX; /*no*/
      }

      [data-dpr="3"] & {
        font-size: 42PX; /*no*/
      }

      margin-bottom: 6px;
    }
  }

  .news-item-right {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-left: 10px;
    margin-top: 12px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #acacac;
    font-size: 12PX; /*no*/
    [data-dpr="2"] & {
      font-size: 24PX; /*no*/
    }

    [data-dpr="3"] & {
      font-size: 36PX; /*no*/
    }

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
      townList: {},
      imgSiteUrl: "",
      townName: ""
    };
  },
  methods: {
    onLoad() {
      //   this.imgSiteUrl = imgSiteUrl;
      this.axios
        // .post("/wechat/tieList", {
        .get(process.env.VUE_APP_URL + "/1.json", {
          form: {
            page: this.page++,
            pageSize: 10
          }
        })
        .then(response => {
          // let data = response.data;
          let data = response.data;
          this.list.push.apply(this.list, data.list);
          this.townList = data.townNameList;
          //this.townName = data.townName;
          this.loading = false;
          if (data.list.length < 10) {
            this.finished = true;
          }
        })
        .catch(() => {
          this.error = true;
          this.loading = true;
        });
    },
    // getTownName(userType, townName) {
    //   //   let townName = this.townList[townId];

    //   // if (userType == 1) {
    //   //   //return this.townName + "头条号";
    //   //   return townName + "头条号";
    //   // } else {
    //   //   return "文化礼堂";
    //   // }
    //   return townName;
    // },
    article(id) {
      this.$router.push({ name: "article", params: { id } });
    },
    // parseFileName(fileName) {
    //   let a = [];
    //   a[0] = fileName.substring(0, fileName.lastIndexOf("."));
    //   a[1] = fileName.substr(fileName.lastIndexOf(".") + 1);
    //   return a;
    // },
    // parseAdminImg(img) {
    //   let a = [];
    //   let jsonInfo = JSON.parse(img);
    //   let url = jsonInfo[0]["url"];
    //   a[0] = url.substring(0, url.lastIndexOf("."));
    //   a[1] = url.substr(url.lastIndexOf(".") + 1);
    //   return a[0] + ",w_330,h_330." + a[1];
    // },

    parseJsonImg(jsonImg) {
      let img = JSON.parse(jsonImg);
      return img[0]["url"];
    }
  }
};
</script>
