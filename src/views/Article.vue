<template>
  <div id="article" class="article">
    <p class="title">{{ title }}</p>
    <div class="top">
      <img :src="icon" class="icon" alt="" />
      <div>
        <p class="editor">{{ editor }} &nbsp;&nbsp; {{ townName }}</p>
        <p class="time">{{ $commonJs.getTime(time) }}</p>
      </div>
    </div>
    <div class="content" v-if="userId == -1">
      <div v-for="(item, index) in content" :key="index">
        <p class="text" v-if="item.type == 'text'">{{ item.content }}</p>
        <img v-if="item.type == 'img'" :src="item.content" alt="" />
      </div>
    </div>
    <div class="content" v-if="userId == 1">
      <div v-html="content" class="futext"></div>
    </div>
  </div>
</template>

<style lang="scss">
.wscnph {
  width: 100%;
  height: auto;
}

.futext {
  font-size: 16px; /*no*/
  [data-dpr="2"] & {
    font-size: 32px; /*no*/
  }

  [data-dpr="3"] & {
    font-size: 48px; /*no*/
  }
}
</style>

<style lang="scss" scoped>
.article {
  background: #fff;
  padding: 32px 16px 50px;
}

.title {
  color: #444;
  font-weight: bold;
  font-size: 16px; /*no*/
  [data-dpr="2"] & {
    font-size: 32px; /*no*/
  }
  [data-dpr="3"] & {
    font-size: 48px; /*no*/
  }
}

.top {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 0;
  }

  .editor {
    color: #101010;
    font-size: 14px; /*no*/
    [data-dpr="2"] & {
      font-size: 28px; /*no*/
    }
    [data-dpr="3"] & {
      font-size: 42px; /*no*/
    }
  }

  .time {
    color: #b1b1b1;
    font-size: 12px; /*no*/
    [data-dpr="2"] & {
      font-size: 24px; /*no*/
    }
    [data-dpr="3"] & {
      font-size: 36px; /*no*/
    }
  }
}

.content {
  .text {
    color: #444;
    text-indent: 4em;
    margin: 8px 0;
    font-size: 14px; /*no*/
    [data-dpr="2"] & {
      font-size: 16px; /*no*/
    }
    [data-dpr="3"] & {
      font-size: 20px; /*no*/
    }
  }

  img {
    width: 100%;
    height: auto;
  }
}
</style>

<script>
export default {
  data() {
    return {
      topicId: "",
      articleId: -1,
      userId: -1,
      // id: -1,
      title: "",
      icon: "",
      townName: "",
      time: "",
      content: "",
      editor: "",
      // markList: [],
      like: 0,
      // share: 0,
      // commentList: [],
      // iconColor: "#7d7e80",
      isLike: false,
      // shareColor: "#7d7e80",
      // isShare: false,
      // showFlag: true,
      // comment: "",
      shareImg: ""
      // isDis: 0
    };
  },
  mounted() {
    // this.isDis = isDis;
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: "加载中..."
    });
    this.articleId = this.$route.params.id;
    this.axios
      // .post("/wechat/tieInfo", {
      .get(process.env.VUE_APP_URL + "/3.json", {
        form: {
          id: this.articleId
        }
      })
      .then(response => {
        // let data = response.data.info;
        let data = response.data.list[this.articleId - 1];
        console.log(data);
        this.title = data.title;
        this.icon = data.avatar;
        this.townName = data.townName;
        this.time = data.intime;
        if (data.user_id == 1) {
          this.content = data.content;
          this.userId = data.user_id;
          this.shareImg = data.shareImg
            ? JSON.parse(data.shareImg)[0]["url"]
            : "/images/share_logo.jpg";
        } else {
          this.content = JSON.parse(data.content);
          this.shareImg =
            data.shareImg.indexOf("images") == -1
              ? data.shareImg
              : "/images/share_logo.jpg";
          //this.shareImg = "/images/share_logo.jpg"
        }
        //this.shareImg = "/images/share_logo.jpg"
        if (data.user_type == 1 || data.user_type == 3) {
          this.editor = data.nick;
        } else if (data.user_type == 2) {
          this.editor = data.userName;
        }
        // this.markList = data.markList;
        // this.like = data.zan_count;
        // this.topicId = data.topicId;
        // this.share = data.share;
        // this.commentList = data.commentList;

        // this.wxShare();

        this.$toast.clear();
      })
      .catch(() => {});

    this.$toast.clear();

    // this.getCommentList();
  },
  methods: {
    // wxShare() {
    //   let that = this;
    //   wx.ready(function() {
    //     wx.updateAppMessageShareData({
    //       title: that.title + "-金华晚报", // 分享标题
    //       desc: "本次信息来自金华晚报-金华邻通平台", // 分享描述
    //       link: siteUrl + "/topicInfo?id=" + that.topicId, // 分享链接
    //       imgUrl: siteUrl + that.shareImg, // 分享图标
    //       type: "", // 分享类型,music、video或link，不填默认为link
    //       dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
    //       success: function() {
    //         // 用户确认分享后执行的回调函数
    //       },
    //       cancel: function() {
    //         // 用户取消分享后执行的回调函数
    //       }
    //     });
    //     wx.updateTimelineShareData({
    //       title: that.title + "-金华晚报", // 分享标题
    //       link: siteUrl + "/topicInfo?id=" + that.topicId, // 分享链接
    //       imgUrl: siteUrl + that.shareImg, // 分享图标
    //       success: function() {
    //         // 用户确认分享后执行的回调函数
    //       },
    //       cancel: function() {
    //         // 用户取消分享后执行的回调函数
    //       }
    //     });
    //   });
    // },
    // shareClick() {
    //   if (!this.isShare) {
    //     this.shareColor = "#f9a721";
    //     this.share++;
    //     this.isShare = true;
    //     this.wxShare();
    //   }
    // },
    // back() {
    //   this.showFlag = true;
    // }
  }
};
</script>
