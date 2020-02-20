<template>
  <div class="editProfile">
    <van-cell title="头像" size="large" :center="centerFlag">
      <template slot="default">
        <img :src="icon" alt="" />
      </template>
    </van-cell>
    <van-cell title="昵称" is-link :value="name" @click="showName = true" />
    <!-- <van-cell title="性别" is-link :value="sex" @click="showPicker = true" /> -->
    <!-- <van-cell title="手机号码" is-link :value="tel" @click="showTel = true" /> -->

    <van-dialog
      v-model="showName"
      title="修改昵称"
      show-cancel-button
      cancel-button-color="#1989fa"
      :before-close="beforeCloseName"
    >
      <van-field v-model="newName" placeholder="请输入新的昵称" />
    </van-dialog>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="confirmSex"
      />
    </van-popup>

    <van-dialog
      v-model="showTel"
      title="修改手机号码"
      show-cancel-button
      cancel-button-color="#1989fa"
      :before-close="beforeCloseTel"
    >
      <van-field v-model="newTel" placeholder="请输入手机号码" />
    </van-dialog>
  </div>
</template>

<style lang="scss">
.editProfile {
  .van-cell:not(:last-child) {
    border-bottom: 1px solid #efefef; /*no*/
  }
  .van-cell__value img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 0;
  }
  .van-dialog {
    .van-dialog__header {
      margin-bottom: 16px;
      @include fontSize(16px);
    }
    input {
      background: #e0e0e0;
      padding: 6px 8px;
      border-radius: 10px; /*no*/
      @include fontSize(14px);
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      icon: "",
      name: "",
      centerFlag: true,
      sex: "",
      tel: "",
      newTel: "",
      columns: ["男", "女"],
      showPicker: false,
      showTel: false,
      showName: false,
      newName: ""
    };
  },
  mounted() {
    // this.axios
    //   .post("/wechat/userInfo")
    //   .then(response => {
    //     console.log(response);
    //     let data = response.data;
    //     this.icon = data.info.avatar;
    //     this.name = data.info.nick;

    //     this.$toast.clear();
    //   })
    //   .catch(() => {});

    let data = {
      info: {
        user_type: 1,
        user_id: 1,
        nick: "文化礼堂",
        avatar: "img/icon.jpg",
        townId: 13,
        userName: "文化礼堂",
        townName: "文化礼堂"
      }
    };
    this.icon = data.info.avatar;
    this.name = data.info.nick;

    this.$toast.clear();
  },
  methods: {
    beforeCloseName(action, done) {
      console.log(action);
      if (action == "cancel") {
        done();
      } else if (action == "confirm") {
        let newName = this.newName;
        if (newName.length == 0) {
          this.$toast.fail("昵称不能为空");
          done(false);
        } else if (newName.length > 10) {
          this.$toast.fail("不能超过10个字");
          done(false);
        } else {
          // this.axios
          //   .post("/wechat/editUserInfo", {
          //     form: {
          //       name: newName
          //     }
          //   })
          //   .then(response => {
          //     console.log(response);
          //     if (response.data.code == 20000) {
          //       done();
          //       this.$toast.success("修改成功");
          //       this.name = newName;
          //     }
          //   })
          //   .catch(() => {});

          done();
          this.$toast.success("修改成功");
          this.name = newName;
        }
      }
    },
    confirmSex(picker, value) {
      console.log(value);
      this.sex = picker;
      this.showPicker = false;
    },
    // confirmTel() {
    //   let flag = this.$commonJs.checkPhone(this.tel);
    //   console.log(flag);
    //   if (flag) {
    //     this.$toast.success("修改成功");
    //   } else {
    //     this.$toast.fail("手机号码有误");
    //   }
    // },
    beforeCloseTel(action, done) {
      console.log(action);
      if (action == "cancel") {
        done();
      } else if (action == "confirm") {
        let flag = this.$commonJs.checkPhone(this.tel);
        console.log(flag);
        if (flag) {
          this.tel = this.newTel;
          this.$toast.success("修改成功");
          done();
        } else {
          this.$toast.fail("手机号码有误");
          done(false);
        }
      }
    }
  }
};
</script>
