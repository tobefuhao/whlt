<template>
  <div id="home" class="home">
    <!-- <Header></Header> -->
    <div class="content">
      <div class="banner">
        <van-swipe :autoplay="5000">
          <van-swipe-item
            v-for="(item, index) in imageList"
            :key="index"
            @click="linkTo(item.topicId, item.href)"
          >
            <!-- <img v-lazy="JSON.parse(item.img)[0].url" /> -->
            <img :src="parseJsonImg(item.img)" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- <ul class="nav" v-if="lmLength != 0">
        <li v-for="(item, index) in lmList" :key="index" @click="lmLink(index)">
          <img class="icon" :src="parseJsonImg(item.img)" />
          <p>{{ item.name }}</p>
        </li>
        <li @click="lmLink(0)" v-if="lmLength > 3">
          <img class="icon" src="/images/more.jpg" />
          <p>更多</p>
        </li>
      </ul> -->
      <ul class="nav">
        <li v-for="(item, index) in lmList" :key="index" @click="lmLink(index)">
          <img class="icon" :src="parseJsonImg(item.img)" />
          <p>{{ item.name }}</p>
        </li>
      </ul>
      <HomeList></HomeList>
      <Footer :navActive="0"></Footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  background: #eee;
  @include fontSize(12PX);

  // & > .content {
  //   margin-top: 1.466667rem;
  // }
}

.banner {
  img {
    width: 100%;
    height: 160px;
    display: block;
    // padding: 30px 60px;
    box-sizing: border-box;
    background-color: #fff;
    pointer-events: none;
  }
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  margin-bottom: 5px;
  padding: 8px 0;

  .icon {
    // background: url("../assets/images/1.jpeg") no-repeat 100%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-bottom: 2px;

    & + p {
      text-align: center;
      color: #000;
    }
  }
}
</style>

<script>
// import Header from "@components/Header.vue";
import HomeList from "@/components/HomeList.vue";
import Footer from "@/components/Footer.vue";

export default {
  data() {
    return {
      imageList: [],
      lmList: []
      // lmLength: 0
    };
  },
  components: {
    // Header,
    HomeList,
    Footer
  },
  mounted() {
    this.$store.commit("setLmActive", 0);

    // let a = {
    //   topicId: 1,
    //   href: "",
    //   img: '[{"url":"../assets/images/1.jpeg"}]'
    // };
    // console.log(JSON.parse(a.img)[0].url);
    // return;
    // this.axios
    //   .post("/wechat/picList")
    //   .then(response => {
    //     this.imageList = response.data.list;
    //     this.$toast.clear();
    //   })
    //   .catch(() => {});
    this.imageList = [
      {
        topicId: 1,
        href: "",
        img: '[{"url":"img/1.png"}]'
      },
      {
        topicId: 2,
        href: "",
        img: '[{"url":"img/2.png"}]'
      },
      {
        topicId: 3,
        href: "",
        img: '[{"url":"img/3.png"}]'
      }
    ];
    this.$toast.clear();
    this.axios
      .get(process.env.VUE_APP_URL + "/2.json")
      .then(response => {
        this.lmList = response.data;
        this.lmLength = this.lmList.length;
      })
      .catch(() => {});
  },
  methods: {
    linkTo(topicId, href) {
      if (topicId) {
        this.$router.push({ name: "article", params: { id: topicId } });
      } else {
        window.location.href = href;
      }
    },
    parseJsonImg(jsonImg) {
      let img = JSON.parse(jsonImg);
      return img[0]["url"];
    },
    lmLink(i) {
      console.log(i);
      this.$store.commit("setLmActive", i);
      this.$router.push({ name: "lm" });
    }
  }
};
</script>
