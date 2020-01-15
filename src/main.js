import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "lib-flexible";

import Vant from "vant";
// import { Lazyload } from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
// Vue.use(Lazyload);

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

// import wx from "weixin-js-sdk";
// Vue.prototype.$wx = wx;

// 通用外部文件
import "@assets/css/common.css";
import commonJs from "@assets/js/common";
Vue.prototype.$commonJs = commonJs;

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
