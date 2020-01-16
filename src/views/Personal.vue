<template>
  <div class="personal">
    <div class="top-bg"></div>
    <div class="wrapper">
      <img :src="icon" class="icon" alt="" />
      <div class="btn-wrapper">
        <!-- <p @click="apply">申请加V</p> -->
        <p @click="edit">编辑资料</p>
      </div>
      <p class="name">{{ name }}</p>
      <!-- <p class="number">
        <span>{{ follow }}</span
        >关注 <span>{{ fans }}</span
        >粉丝
      </p> -->
      <div class="dynamic">
        <p>动态</p>
        <van-pull-refresh
          v-model="isLoading"
          @refresh="onRefresh"
          class="dynamic-list"
          v-if="list.length != 0"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
          >
            <van-cell
              class="dynamic-list-item"
              v-for="(item, index) in list"
              :articleId="item.id"
              :index="index"
              :key="index"
            >
              <p>{{ item.title }}</p>
              <img :src="item.image[0].src" alt="" />
              <p>
                <span>{{ item.read }}阅读</span>
                <span>{{ item.commit }}评论</span>
                <span>{{ item.like }}点赞</span>
              </p>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <div v-if="list.length == 0" class="empty">
      暂无动态
    </div>
    <van-popup v-model="show" position="right" :overlay="false">
      内容
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.personal {
  .top-bg {
    background: rgba(62, 62, 62, 1);
    height: 122px;
  }
  .wrapper {
    position: relative;
    .icon {
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      left: 15px;
      top: -30px;
    }
  }
  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: #fff;
    font-size: 14PX; /*no*/
    [data-dpr="2"] & {
      font-size: 28PX; /*no*/
    }
    [data-dpr="3"] & {
      font-size: 46PX; /*no*/
    }
    p:first-child {
      color: #486a98;
      margin-right: 18px;
    }
    p:last-child {
      margin-right: 18px;
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 3px 6px;
      color: #486a98;
      border: 1px solid #3792d2; /*no*/
      border-radius: 5PX; /*no*/
    }
  }
  .name {
    color: #212121;
    padding-left: 15px;
    padding-bottom: 6px;
    background: #fff;
    font-size: 18PX; /*no*/
    [data-dpr="2"] & {
      font-size: 36PX; /*no*/
    }
    [data-dpr="3"] & {
      font-size: 60PX; /*no*/
    }
  }
  .number {
    padding-left: 15px;
    color: #a6a6a5;
    background: #fff;
    font-size: 14PX; /*no*/
    [data-dpr="2"] & {
      font-size: 28PX; /*no*/
    }
    [data-dpr="3"] & {
      font-size: 46PX; /*no*/
    }
    span {
      color: #436795;
      margin-right: 2px;
      &:last-child {
        margin-left: 6px;
      }
    }
  }
  .dynamic {
    border-top: 1px solid #ebedf0; /*no*/
    padding-top: 6px;
    background: #ffffff;
    & > p {
      color: rgba(243, 91, 96, 1);
      border-bottom: 2px solid rgba(243, 91, 96, 1); /*no*/
      padding-bottom: 3px;
      margin-left: 15px;
      display: inline-block;
      font-size: 14PX; /*no*/
      [data-dpr="2"] & {
        font-size: 28PX; /*no*/
      }
      [data-dpr="3"] & {
        font-size: 46PX; /*no*/
      }
    }
    .dynamic-list {
      background: #f4f5f6;
    }
    .dynamic-list-item {
      border-bottom: 1px solid #ebedf0; /*no*/
      margin-bottom: 8px;
      img {
        width: 100%;
      }
      p:first-child {
        margin-bottom: 4px;
        color: #212121;
        font-size: 16PX; /*no*/
        [data-dpr="2"] & {
          font-size: 32PX; /*no*/
        }
        [data-dpr="3"] & {
          font-size: 52PX; /*no*/
        }
      }
      p:last-child {
        text-align: right;
        margin-top: 2px;
        font-size: 12PX; /*no*/
        [data-dpr="2"] & {
          font-size: 24PX; /*no*/
        }
        [data-dpr="3"] & {
          font-size: 40PX; /*no*/
        }
        span {
          margin-right: 6px;
          color: #a6a6a5;
        }
      }
    }
  }
  .empty {
    text-align: center;
    margin-top: 150px;
    font-size: 16PX; /*no*/
    [data-dpr="2"] & {
      font-size: 32PX; /*no*/
    }
    [data-dpr="3"] & {
      font-size: 52PX; /*no*/
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      icon: "",
      name: "",
      follow: 0,
      fans: 0,
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
      show: false
    };
  },
  mounted() {
    this.axios
      .post("/api/app/mock/167125/app/post/myInfo")
      .then(response => {
        console.log(response.data);
        let data = response.data;
        this.icon = data.icon;
        this.name = data.name;
        this.follow = 1;
        this.fans = data.fans;
      })
      .catch(() => {});
  },
  methods: {
    onRefresh() {
      this.page = 1;
      this.axios
        .post("/api/app/mock/167125/post/circlesList", {
          params: {
            type: this.type,
            page: this.page
          }
        })
        .then(response => {
          this.list = response.data.data;
          this.isLoading = false;
        })
        .catch(() => {});
    },
    onLoad() {
      this.axios
        .post("/api/app/mock/167125/post/circlesList", {
          params: {
            type: this.type,
            page: this.page++
          }
        })
        .then(response => {
          console.log(response);
          this.list.push.apply(this.list, response.data.data);
          this.loading = false;
          if (response.data.data.length < 5) {
            this.finished = true;
          }
        })
        .catch(() => {
          this.error = true;
        });
    },
    getTime(time) {
      let now = new Date().getTime();
      let miu = now - time;
      let day = Math.floor(miu / 1000 / 60 / 60 / 24);
      let hour = Math.floor((miu / 1000 / 60 / 60) % 24);
      let min = Math.floor((miu / 1000 / 60) % 60);
      let second = Math.floor((miu / 1000) % 60);
      if (day != 0) {
        return day + "天前";
      } else if (hour != 0) {
        return hour + "小时前";
      } else if (min != 0) {
        return min + "分钟前";
      } else {
        return second + "秒前";
      }
    },
    article(id) {
      this.$router.push({ name: "article", params: { id } });
    },
    apply() {
      this.axios
        .post("http://rap2api.taobao.org/app/mock/167125/app/circlesList", {
          params: {
            type: this.type,
            page: this.page++
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(() => {
          this.error = true;
        });
    },
    edit() {
      this.$router.push({ name: "editProfile" });
    }
  }
};
</script>
