<template>
  <div class="editArea">
    <AreaList :step="1" @town="getTown" @village="getVillage"></AreaList>
    <van-button type="primary" class="confirm" @click="submit">确定</van-button>
  </div>
</template>
<style lang="scss" scoped>
.userType {
  margin-bottom: 16px;
}
.userInfo {
  margin-bottom: 16px;
}
.confirm {
  display: block;
  margin: 32px auto;
  font-size: 16PX; /*no*/
  [data-dpr="2"] & {
    font-size: 32PX; /*no*/
  }
  [data-dpr="3"] & {
    font-size: 48PX; /*no*/
  }
}
</style>

<script>
import AreaList from "@/components/Area.vue";
export default {
  data() {
    return {
      userType: "",
      townId: "",
      streetId: "",
      communityId: "",
      villageId: ""
    };
  },
  components: {
    AreaList
  },
  mounted() {
    // 用户类型 1普通用户  2管理员
    this.userType = this.$store.state.userType;
  },
  methods: {
    getTown(val) {
      this.townId = val;
    },
    getVillage(val) {
      this.villageId = val;
    },

    submit() {
      let form = {};
      if (!this.townId) {
        this.$dialog.alert({
          message: "请选择镇"
        });
        return;
      }
      if (!this.villageId) {
        this.$dialog.alert({
          message: "请选择村"
        });
        return;
      }

      if (this.userType == "2") {
        form = {
          id1: "",
          id2: this.communityId,
          userType: "",
          name: "",
          phone: ""
        };
      } else {
        form = {
          id1: this.villageId,
          id2: this.communityId,
          userType: "",
          name: "",
          phone: ""
        };
      }
      // this.axios
      //   .post("/wechat/userBindTown", {
      //     form: form
      //   })
      //   .then(response => {
      //     if (response.data.code == 20000) {
      //       this.$router.push({ name: "me" });
      //     } else {
      //       this.$dialog.alert({
      //         message: "出错了"
      //       });
      //     }
      //   })
      //   .catch(() => {});

      this.$router.push({ name: "me" });
    }
  }
};
</script>
