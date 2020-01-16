import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [{
      path: "/home",
      name: "home",
      component: resolve => require(["./views/Home.vue"], resolve),
      meta: {
        title: "文化礼堂",
        isLogin: false
      }
    },
    {
      path: "/auditoriumShow",
      name: "auditoriumShow",
      component: resolve => require(["./views/AuditoriumShow.vue"], resolve),
      meta: {
        title: "文化礼堂",
        isLogin: false
      }
    },
    {
      path: "/rank",
      name: "rank",
      component: resolve => require(["./views/Rank.vue"], resolve),

      meta: {
        title: "文化礼堂",
        isLogin: false
      }
    },
    {
      path: "/me",
      name: "me",
      component: resolve => require(["./views/Me.vue"], resolve),

      meta: {
        title: "文化礼堂",
        isLogin: false
      }
    },
    {
      path: "/editArea",
      name: "editArea",
      component: resolve => require(["./views/EditArea.vue"], resolve),

      meta: {
        title: "文化礼堂",
        isLogin: false
      }
    },
    {
      path: "/article/:id",
      name: "article",
      component: resolve => require(["./views/Article.vue"], resolve),

      meta: {
        title: "文化礼堂",
        isLogin: false
      }
    },
    {
      path: "/personal",
      name: "personal",
      component: resolve => require(["./views/Personal.vue"], resolve),

      meta: {
        title: "文化礼堂",
        isLogin: false
      }
    },
    {
      path: "/editProfile",
      name: "editProfile",
      component: resolve => require(["./views/EditProfile.vue"], resolve),

      meta: {
        title: "文化礼堂",
        isLogin: false
      }
    },
    {
      path: "/auditoriumInfo/:id",
      name: "auditoriumInfo",
      component: resolve => require(["./views/AuditoriumInfo.vue"], resolve),

      meta: {
        title: "文化礼堂",
        isLogin: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: resolve => require(["./views/Login.vue"], resolve),

      meta: {
        title: "文化礼堂",
        isLogin: true
      }
    },
    {
      path: "/lm",
      name: "lm",
      component: resolve => require(["./views/Lm.vue"], resolve),

      meta: {
        title: "文化礼堂",
        isLogin: true
      }
    },
    {
      path: "/townInfo",
      name: "townInfo",
      component: resolve => require(["./views/TownInfo.vue"], resolve),

      meta: {
        title: "文化礼堂",
        isLogin: true
      }
    },
    {
      path: "/",
      // component: resolve => require(["./views/Login.vue"], resolve),
      component: resolve => require(["./views/Loading.vue"], resolve),

      meta: {
        title: "文化礼堂",
        isLogin: false
      }
    }
  ]
});