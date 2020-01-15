<template>
  <div class="left-slider" data-type="0">
    <div
      class="left-slider-item"
      @touchstart.capture="touchStart"
      @touchend.capture="touchEnd"
      @click="skip"
    >
      <slot></slot>
    </div>
    <div class="delete" @click="deleteItem"></div>
  </div>
</template>

<style lang="scss" scoped>
.left-slider {
  position: relative;
  height: 95px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.left-slider[data-type="0"] {
  transform: translate3d(0, 0, 0);
}
.left-slider[data-type="1"] {
  transform: translate3d(-2rem, 0, 0);
}
.left-slider:after {
  content: " ";
  position: absolute;
  left: 0.2rem;
  bottom: 0;
  right: 0.2rem;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.left-slider-item {
  background: #fff;
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0;
}
.left-slider .delete {
  width: 2rem;
  height: 95px;
  background: url("../assets/images/delete.png") no-repeat center center;
  background-size: 40%;
  font-size: 17px;
  position: absolute;
  top: 0;
  right: -2rem;
}
</style>

<script>
export default {
  name: "index",
  data() {
    return {
      startX: 0,
      endX: 0
    };
  },
  props: ["articleId", "index"],
  methods: {
    //跳转
    skip() {
      if (this.checkSlide()) {
        this.restSlide();
      } else {
        // alert("You click the slide!");
        console.log(this.articleId);
        this.$router.push({ name: "article", params: { id: this.articleId } });
      }
    },
    //滑动开始
    touchStart(e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchEnd(e) {
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement;
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;

      // 左滑
      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide();
        parentElement.dataset.type = 1;
      }

      // 右滑
      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide();
        parentElement.dataset.type = 0;
      }

      this.startX = 0;
      this.endX = 0;
    },
    //判断当前是否有滑块处于滑动状态
    checkSlide() {
      let listItems = document.querySelectorAll(".left-slider");

      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true;
        }
      }
      return false;
    },
    //复位滑动状态
    restSlide() {
      let listItems = document.querySelectorAll(".left-slider");
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0;
      }
    },
    //删除
    deleteItem() {
      // this.axios
      // .post("/api/app/mock/167125/post/circlesList", {
      //   params: {
      //     type: this.type,
      //     page: this.page++
      //   }
      // })
      // .then(response => {
      //   console.log(response);
      // })
      // .catch(() => {
      //   this.error = true;
      // });

      // 复位
      this.restSlide();
      this.$emit("deleteItem", this.index);
    }
  }
};
</script>
