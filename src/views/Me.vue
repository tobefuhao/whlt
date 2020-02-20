<template>
  <div class="my-info">
    <div class="top" @click="editPersonal">
      <div>
        <p>
          <img :src="icon" class="icon" alt="" />
          <span class="name">{{ name }}</span>
        </p>
        <van-icon name="arrow" />
      </div>
    </div>
    <van-cell-group class="group">
      <van-cell :title="userTown" :value="townName" is-link @click="TownInfo" />
      <!-- <van-cell title="我的圈子" is-link @click="hobbyShow" /> -->
      <!-- <van-cell title="我的帖子" is-link @click="myPost" /> -->
      <!-- <van-cell title="我的评论" is-link @click="myCommit" /> -->
      <!-- <van-cell title="我的点赞" is-link @click="myZan" /> -->
    </van-cell-group>

    <Footer :navActive="3"></Footer>
  </div>
</template>

<style lang="scss">
.my-info {
  background: rgba(244, 245, 246, 1);

  .top {
    background: #3e3e3e;
    color: #fff;
    padding: 32px 16px 16px;

    & > div:first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    margin-right: 16px;
  }

  .name {
    @include fontSize(16px);
  }

  .top-row {
    text-align: center;
    margin-top: 32px;

    .van-col:not(:last-child) {
      border-right: 1px solid #4d4d4d; /*no*/
    }

    p:first-child {
      @include fontSize(16px);
    }

    p:last-child {
      color: #616161;
      @include fontSize(12px);
    }
  }

  .nav-row {
    text-align: center;
    background: #fff;
    padding: 16px 0;
    margin-bottom: 8px;

    img {
      width: 25px;
    }

    p {
      color: rgba(37, 36, 37, 1);
      @include fontSize(14px);
    }
  }

  .group {
    margin-top: 8px;
  }

  .hobby-list {
    top: 150px;
  }
}
</style>

<script>
import Footer from "@/components/Footer.vue";

export default {
  data() {
    return {
      icon: "",
      name: "",
      hobbyList: [],
      userType: "",
      townName: "",
      townID: "",
      userTown: ""
    };
  },
  components: {
    Footer
  },
  mounted() {
    this.$toast.loading({ mask: true, duration: 0, message: "加载中..." });
    // this.axios
    //   .post("/wechat/userInfo")
    //   .then(response => {
    //     let data = response.data;
    //     this.icon = data.info.avatar;
    //     this.name = data.info.nick;
    //     this.userType = data.info.user_type;
    //     if (this.userType == 1) {
    //       this.userTown = "我的小区";
    //     } else {
    //       this.userTown = "我的社区";
    //     }
    //     this.townName = data.info.townName;
    //     this.townID = data.info.town_id;
    //     this.$toast.clear();
    //   })
    //   .catch(() => {});

    let data = {
      info: {
        // user_type: 1,
        user_id: 1,
        nick: "文化礼堂",
        avatar: "img/icon.jpg",
        town_id: 13,
        userName: "文化礼堂",
        townName: "文化礼堂"
      }
    };
    this.icon = data.info.avatar;
    this.name = data.info.nick;
    this.userType = data.info.user_type;
    if (this.userType == 1) {
      this.userTown = "我的村子";
    } else {
      this.userTown = "我的村子";
    }
    this.townName = data.info.townName;
    this.townID = data.info.town_id;
    this.$toast.clear();
  },
  methods: {
    TownInfo() {
      this.$router.push({ name: "townInfo", params: { id: this.townID } });
    },
    // hobbyShow() {
    //   this.$router.push({ name: "myHobby" });
    // },
    // myPost() {
    //   this.$router.push({ name: "post" });
    // },
    // myCommit() {
    //   this.$router.push({ name: "comment" });
    // },
    // myZan() {
    //   this.$router.push({ name: "zan" });
    // },
    editPersonal() {
      this.$router.push({ name: "editProfile" });
    }
  }
};
</script>
