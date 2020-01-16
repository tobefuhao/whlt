<template>
  <div class="town-info">
    <van-cell-group class="group" @click="editArea">
      <van-cell title="镇" :value="town" is-link></van-cell>
      <van-cell title="村" :value="village" is-link></van-cell>
    </van-cell-group>
    <div style="text-align:center;margin-top:30px;">
      <van-button type="primary" @click="editArea">编辑</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      area: "",
      town: "",
      village: "",
      townList: [],
      userType: ""
    };
  },
  mounted() {
    // this.userType = userType;

    this.$toast.loading({ mask: true, duration: 0, message: "加载中..." });
    // this.axios
    //   .post("/wechat/userTownInfo", { form: { townId: this.$route.params.id } })
    //   .then(response => {
    //     console.log(response);
    //     let data = response.data;

    //     this.townList = data.list;
    //     this.area = this.townList[1].name;
    //     this.street = this.townList[2].name;
    //     this.community = this.townList[3].name;
    //     if (this.userType == "user") {
    //       this.village = this.townList[4].name;
    //     }
    //     this.$toast.clear();
    //   })
    //   .catch(() => {});

    let data = {
      list: [{ name: "塔石乡" }, { name: "塘头村" }]
    };

    this.townList = data.list;
    this.town = this.townList[0].name;
    this.village = this.townList[1].name;
    this.$toast.clear();
  },
  methods: {
    editArea() {
      this.$router.push({ name: "editArea" });
    }
  }
};
</script>
