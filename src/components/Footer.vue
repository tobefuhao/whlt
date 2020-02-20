<template>
  <div id="footer" class="footer">
    <van-tabbar v-model="active" active-color="#FB575C" safe-area-inset-bottom>
      <van-tabbar-item
        icon="wap-home-o"
        replace
        to="/home"
        active-color="#FB575C"
        inactive-color="#646464"
        >首页
      </van-tabbar-item>
      <van-tabbar-item
        icon="location-o"
        replace
        to="/auditoriumShow"
        active-color="#FB575C"
        inactive-color="#646464"
        >礼堂
      </van-tabbar-item>
      <!-- <van-tabbar-item @click="publishChoose" v-if="isDis == '0'">
        <img slot="icon" class="add" :src="add" />
      </van-tabbar-item> -->
      <van-tabbar-item
        icon="chart-trending-o"
        replace
        to="/rank"
        active-color="#FB575C"
        inactive-color="#646464"
        >排行
      </van-tabbar-item>
      <van-tabbar-item
        icon="user-o"
        replace
        to="/me"
        active-color="#FB575C"
        inactive-color="#646464"
        >我的
      </van-tabbar-item>
    </van-tabbar>
    <van-popup v-model="show" position="bottom" class="add-wrapper">
      <van-row>
        <van-col
          span="12"
          @click.native="publishLm"
          v-if="userType == 'worker'"
        >
          <img src="../assets/images/community.png" alt="" />
          <p>社区发布</p>
        </van-col>
        <van-col span="12" @click.native="publishHobby">
          <img src="../assets/images/circle-active.png" alt="" />
          <p>圈子发布</p>
        </van-col>
        <!-- <van-col span="8" @click.native="publish">
                    <img src="../assets/images/activity.png" alt=""/>
                    <p>活动发布</p>
                </van-col> -->
      </van-row>
      <van-icon name="close" size="0.8rem" color="#676767" @click="cancel" />
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.add {
  height: 0.8rem;
}

.add-wrapper {
  height: 150px;
  text-align: center;

  div {
    height: 90px;
  }

  img {
    width: 30px;
    margin: 15px auto 5px;
  }

  p {
    text-align: center;
    color: #676767;
  }
}
</style>

<script>
export default {
  data() {
    return {
      active: this.navActive,
      add: require("../assets/images/add.png"),
      show: false,
      count: "",
      userType: "",
      isDis: ""
    };
  },
  props: ["navActive"],
  mounted() {
    if (this.active != 1) {
      this.$store.commit("setHobbyActive", 0);
    }

    // this.isDis = isDis;
    // this.userType = userType;

    // this.axios
    //   .post("/wechat/noticeCount")
    //   .then(response => {
    //     console.log(response);
    //     if (response.data.count == 0) {
    //       this.count = "";
    //     } else {
    //       this.count = response.data.count;
    //     }
    //   })
    //   .catch(() => {});
    this.count = 1;
  },
  methods: {
    publishChoose() {
      this.show = true;
    },
    cancel() {
      this.show = false;
    },
    publishLm() {
      this.$router.push({ name: "publishLm" });
    },
    publishHobby() {
      this.$router.push({ name: "publishHobby" });
    }
  }
};
</script>
