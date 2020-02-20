<template>
  <div id="lm" class="lm">
    <van-tabs
      ref="vanTabs"
      type="card"
      v-model="active"
      title-active-color="rgb(255, 255, 255)"
      title-inactive-color="rgb(0, 118, 255)"
      color="rgb(0, 118, 255)"
    >
      <van-tab
        v-for="(item, index) in lmList"
        :key="index"
        :title="item.name"
        ref="vanTab"
      >
        <LmList tab-solt="default" :id="item.id" :index="index"></LmList>
      </van-tab>
    </van-tabs>
    <van-button type="primary" class="btnInfo" @click="btnClick"
      >首页
    </van-button>
  </div>
</template>
<style lang="scss">
.lm {
  margin-bottom: 15px;

  .van-tabs__wrap {
    background: #fff;
    padding: 8px 0;
    @include fontSize(14px);
  }
  .van-tabs__content {
    margin-top: 16px;
  }
  .van-tree-select {
    height: 12.7rem !important;
    @include fontSize(14px);
    .van-icon-checked {
      font-size: 0 !important; /*no*/
    }
  }
  // .tip {
  //   margin-bottom: 50px;
  //   height: 50px;
  //   line-height: 50px;
  //   text-align: center;
  //   color: #acacac;
  //   font-size: 12PX; /*no*/
  //   [data-dpr="2"] & {
  //     font-size: 24PX; /*no*/
  //   }
  //   [data-dpr="3"] & {
  //     font-size: 36PX; /*no*/
  //   }
  // }
  .btnInfo {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include fontSize(16px);
  }
}
</style>

<script>
import LmList from "@/components/LmList.vue";
export default {
  data() {
    return {
      active: 0,
      lmList: []
    };
  },
  mounted() {
    this.$toast.loading({ mask: true, message: "加载中...", duration: 0 });
    this.active = this.$store.state.lmActive;

    this.axios
      // .post("/wechat/lanmuList")
      .get(process.env.VUE_APP_URL + "/2.json")
      .then(response => {
        let data = response.data;
        // let data=response.data.list
        this.lmList = data;
        this.$toast.clear();
      })
      .catch(() => {});
  },
  components: {
    LmList
  },
  watch: {
    active(newVal, oldVal) {
      this.$store.commit("setLmActive", newVal);
    }
  },
  methods: {
    btnClick() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>
