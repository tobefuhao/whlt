<template>
  <div class="auditorium-list" ref="list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <ul class="clearfix">
        <li v-for="(item, index) in list" :key="index">
          <router-link :to="'auditoriumInfo/' + item.topicId">
            <img :src="item.avatar" alt="" />
            <p class="title">{{ item.townName }}</p>
          </router-link>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.auditorium-list {
  margin-bottom: 1.333333rem;
}
ul {
  margin: 16px;
}
li {
  float: left;
  background: #fff;
  width: 166px;
  height: 166px;
  margin-bottom: 11px;
  &:nth-child(2n-1) {
    margin-right: 11px;
  }
  // div {
  //   border-radius: 50%;
  //   overflow: hidden;
  //   width: 100px;
  // }
  img {
    width: 110px;
    height: 110px;
    margin: 10px auto;
    border-radius: 50%;
    overflow: hidden;
  }
  .title {
    text-align: center;
    font-size: 14PX; /*no*/
    [data-dpr="2"] & {
      font-size: 28PX; /*no*/
    }
    [data-dpr="3"] & {
      font-size: 42PX; /*no*/
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
  props: ["villageId"],
  methods: {
    onLoad() {
      //   this.imgSiteUrl = imgSiteUrl;
      //   let form = {};
      //   if (this.index == 0) {
      //     form = {
      //       hobbyId: -1,
      //       page: this.page++,
      //       pageSize: 10
      //     };
      //   } else {
      //     form = {
      //       hobbyId: this.hobbyId,
      //       page: this.page++,
      //       pageSize: 10
      //     };
      //   }

      this.axios
        //   .post("/wechat/hobbyTieList", {
        //     form: form
        //   })
        .get(process.env.VUE_APP_URL + "/1.json")
        .then(response => {
          console.log(response);
          let data = response.data.list;
          //   let data = response.data.hobbyTieList;
          this.list.push.apply(this.list, data);
          this.loading = false;
          if (data.length < 10) {
            this.finished = true;
          }
          // this.$toast.clear();
        })
        .catch(() => {
          this.error = true;
        });
    },

    search() {
      this.list=[];
      this.axios
        //   .post("/wechat/hobbyTieList", {
        //     form: form
        //   })
        .get(process.env.VUE_APP_URL + "/1.json")
        .then(response => {
          console.log(response);
          let data = response.data.list;
          //   let data = response.data.hobbyTieList;
          this.list.push(data[0]);
          // this.$toast.clear();
        })
        .catch(() => {
          this.error = true;
        });
    },

    parseJsonImg(jsonImg) {
      let img = JSON.parse(jsonImg);
      return img[0]["url"];
    }
  }
};
</script>
