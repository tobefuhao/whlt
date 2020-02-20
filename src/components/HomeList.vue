<template>
  <div id="news-list" class="news-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div
        class="item-wrapper"
        v-for="(item, index) in channelList"
        :key="index"
      >
        <van-cell @click="lmLink(index)">
          <img :src="item.img" alt="" class="icon" />
          <p class="channel">{{ item.name }}</p>
        </van-cell>
        <div
          class="top"
          v-if="item.newsList.length > 0"
          @click="article(item.hotNews.topicId)"
        >
          <img :src="JSON.parse(item.hotNews.img)[0].url" alt="" />
          <p class="title">{{ item.hotNews.title }}</p>
        </div>
        <ul v-if="item.newsList.length > 0">
          <li
            v-for="(e, i) in item.newsList"
            :key="i"
            @click="article(e.topicId)"
          >
            <p class="list-title van-multi-ellipsis--l2">{{ e.title }}</p>
            <img :src="JSON.parse(e.img)[0].url" alt="" class="thumb" />
          </li>
        </ul>
      </div>
    </van-pull-refresh>
  </div>
</template>

<style lang="scss" scoped>
.news-list {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 1.333333rem;
}
.item-wrapper {
  padding: 0 10px;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  margin-bottom: 30px;
}
.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0;
  display: inline-block;
  vertical-align: middle;
}
.channel {
  display: inline-block;
  margin-left: 10px;
  @include fontSize(14PX);
}
.top {
  position: relative;
  img {
    width: 335px;
    height: 150px;
  }
  .title {
    position: absolute;
    bottom: 10px;
    color: #fff;
    @include fontSize(16PX);
    padding: 0 20px;
  }
}
li:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.list-title {
  float: left;
  width: calc(100% - 70px);
  height: 50px;
  line-height: 25px;
  padding: 10px 0;
  @include fontSize(14PX);
}
.thumb {
  width: 50px;
  height: 50px;
  padding: 10px 0;
}
</style>

<script>
export default {
  data() {
    return {
      isLoading: false,
      channelList: []
    };
  },
  mounted() {
    this.onRefresh();
  },
  methods: {
    onRefresh() {
      this.axios
        // .post("/wechat/tieList", {
        .get(process.env.VUE_APP_URL + "/2.json")
        .then(response => {
          console.log(response);
          var data = response.data;
          this.channelList = [];
          for (let i = 0; i < 3; i++) {
            var arr = [];
            for (let j = 1; j < data[i].list.length; j++) {
              arr.push(data[i].list[j]);
            }
            console.log(arr);

            this.channelList.push({
              name: data[i].name,
              img: JSON.parse(data[i].img)[0].url,
              id: data[i].hobbyId,
              hotNews: data[i].list[0],
              newsList: arr
            });
            console.log(this.channelList);
          }
          this.isLoading = false;
        })
        .catch(() => {
          this.error = true;
          this.isLoading = false;
        });
    },
    article(id) {
      console.log(id);
      this.$router.push({ name: "article", params: { id } });
    },
    lmLink(i) {
      console.log(i);
      this.$store.commit("setLmActive", i);
      this.$router.push({ name: "lm" });
    }
  }
};
</script>
