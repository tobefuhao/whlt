<template>
  <div class="area">
    <van-cell-group class="group">
      <van-field
        readonly
        clickable
        label="镇"
        :value="town"
        placeholder="选择镇"
        @click="townShow"
      />
      <van-field
        readonly
        clickable
        label="村"
        :value="village"
        placeholder="选择村"
        @click="villageShow(townId)"
      />
    </van-cell-group>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :title="showPickerTitle"
        :columns="columns"
        :item-height="itemHeight"
        :loading="pickerLoading"
        @cancel="showPicker = false"
        @confirm="confirm"
      />
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.group {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>

<script>
export default {
  data() {
    return {
      itemHeight: 44,
      showPicker: false,
      columns: [],
      town: "",
      village: "",
      clickIndex: -1,
      preIndex: -1,
      showPickerTitle: "",
      townId: "",
      villageId: "",
      townList: [],
      pickerLoading: true
    };
  },
  mounted() {
    this.$toast.loading({ mask: true, duration: 0, message: "加载中..." });
    this.itemHeight = this.$commonJs.getDpr();
    this.$toast.clear();
  },
  props: ["step"],
  methods: {
    getAreaInfo(id) {
      this.quickSearch = false;
      // this.axios
      //   .post("/wechat/townList", {
      //     form: {
      //       id: id
      //     }
      //   })
      //   .then(response => {
      //     let data = response.data.list;
      //     this.townList = data;
      //     this.columns = [];
      //     data.forEach(e => {
      //       this.columns.push(e.name);
      //     });
      //     this.pickerLoading = false;
      //   })
      //   .catch(() => {});
      let data;
      switch (id) {
        case -1:
          data = [{ id: 1, name: "塔石乡" }, { id: 2, name: "雅畈镇" }];
          break;
        case 1:
          data = [{ id: 3, name: "塘头村" }, { id: 4, name: "高塘村" }];
          break;
        case 2:
          data = [{ id: 5, name: "石楠塘村" }];
          break;
        default:
          break;
      }
      this.townList = data;
      this.columns = [];
      data.forEach(e => {
        this.columns.push(e.name);
      });
      this.pickerLoading = false;
    },
    townShow() {
      this.pickerLoading = true;
      this.clickIndex = 0;
      this.getAreaInfo(-1);
      this.showPicker = true;
      this.showPickerTitle = "镇列表";
    },
    villageShow(townId) {
      this.pickerLoading = true;
      this.clickIndex = 1;
      if (this.clickIndex - this.preIndex > 1) {
        this.$toast("请选择镇");
      } else {
        this.getAreaInfo(townId);
        this.showPicker = true;
        this.showPickerTitle = "村列表";
      }
    },
    confirm(value, index) {
      let i = this.clickIndex;
      this.preIndex = this.clickIndex;
      this.showPicker = false;
      switch (i) {
        case 0: {
          this.town = value;
          this.village = "";
          this.townId = this.townList[index].id;
          this.villageShow(this.townId);
          this.$emit("town", this.townId);
          break;
        }
        case 1: {
          this.village = value;
          this.villageId = this.townList[index].id;
          this.$emit("village", this.villageId);
          break;
        }
        default:
          break;
      }
    },
    cancel() {
      this.showPicker = false;
    }
  }
};
</script>
