<template>
  <div id="auditorium" class="auditorium">
    <van-image width="100%" src="/img/top.png" />
    <AreaList :step="1" @town="getTown" @village="getVillage"></AreaList>
    <van-button type="primary" class="confirm" @click="submit">确定</van-button>
    <AuditoriumList :villageId="villageId" ref="child"></AuditoriumList>
    <Footer :navActive="1"></Footer>
  </div>
</template>
<style lang="scss" scoped>
.confirm {
  display: block;
  margin: 32px auto;
  width: 100px;
  font-size: 16px; /*no*/
  [data-dpr="2"] & {
    font-size: 32px; /*no*/
  }
  [data-dpr="3"] & {
    font-size: 48px; /*no*/
  }
}
</style>

<script>
import AreaList from "@/components/Area.vue";
import AuditoriumList from "@/components/AuditoriumList.vue";
import Footer from "@/components/Footer.vue";
export default {
  data() {
    return {
      townId: "",
      villageId: ""
    };
  },
  mounted() {},
  components: {
    AreaList,
    AuditoriumList,
    Footer
  },
  methods: {
    getTown(val) {
      this.townId = val;
    },
    getVillage(val) {
      this.villageId = val;
    },
    submit() {
      // let form = {};
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
      this.$refs.child.search();
    }
  }
};
</script>
