<template>
  <div class="rank">
    <p class="time">2020-01-01~2020-01-10</p>
    <van-tabs v-model="active" sticky swipeable animated>
      <van-tab
        v-for="(item, index) in address"
        :title="item.value"
        :key="index"
      >
        <div
          class="item clearfix"
          v-for="(listItem, index) in list"
          :key="index"
        >
          <p class="no">{{ listItem.no }}</p>
          <p class="name">{{ listItem.name }}</p>
          <p class="score">{{ listItem.score }}</p>
        </div>
      </van-tab>
    </van-tabs>
    <Footer :navActive="2"></Footer>
  </div>
</template>
<style lang="scss" scoped>
.rank {
  margin-bottom: 1.333333rem;
}
.time {
  text-align: center;
  color: #ababab;
  background: #fff;
  padding: 10px 0;
  font-size: 14PX; /*no*/
  [data-dpr="2"] & {
    font-size: 28PX; /*no*/
  }

  [data-dpr="3"] & {
    font-size: 42PX; /*no*/
  }
}
.item {
  padding: 10px 0;
  width: 90%;
  margin: auto;
  border-bottom: 1px solid #ccc;
  font-size: 14PX; /*no*/
  [data-dpr="2"] & {
    font-size: 28PX; /*no*/
  }

  [data-dpr="3"] & {
    font-size: 42PX; /*no*/
  }
}
.no {
  float: left;
  width: 30px;
  color: red;
}
.name {
  float: left;
  font-weight: bold;
}
.score {
  float: right;
  width: 30px;
  font-weight: bold;
}
</style>

<script>
import Footer from "@/components/Footer.vue";
export default {
  data() {
    return {
      active: 0,
      address: [],
      list: []
    };
  },
  mounted() {
    // this.$toast.loading({ mask: true, message: "加载中...", duration: 0 });
    this.address = [
      {
        id: 1,
        value: "全部"
      },
      {
        id: 2,
        value: "太平街道"
      },
      {
        id: 3,
        value: "城东街道"
      },
      {
        id: 4,
        value: "城西街道"
      },
      {
        id: 5,
        value: "城北街道"
      }
    ];
    this.list = [
      {
        no: 1,
        name: "文化礼堂文化礼堂文化礼堂文化礼堂",
        score: "20"
      },
      {
        no: 2,
        name: "文化礼堂文化礼堂文化礼堂文化礼堂",
        score: "19.8"
      },
      {
        no: 3,
        name: "文化礼堂文化礼堂文化礼堂文化礼堂",
        score: "19.2"
      },
      {
        no: 4,
        name: "文化礼堂文化礼堂文化礼堂文化礼堂",
        score: "19"
      },
      {
        no: 5,
        name: "文化礼堂文化礼堂文化礼堂文化礼堂",
        score: "19"
      }
    ];
  },
  components: {
    Footer
  },
  methods: {}
};
</script>
