import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // previewInfo: sessionStorage.getItem("sqfb_previewInfo") ?
    //     JSON.parse(sessionStorage.getItem("sqfb_previewInfo")) :
    //     new Object(),
    // userInfo: localStorage.getItem("sqfb_userInfo") ?
    //     JSON.parse(localStorage.getItem("sqfb_userInfo")) :
    //     new Object(),
    // token: localStorage.getItem("sqfb_token") ?
    //     localStorage.getItem("sqfb_token") :
    //     "",
    newUser: "",
    userType: "",
    hobbyActive: "",
    lmActive: ""
  },
  mutations: {
    // preview(state, obj) {
    //     state.previewInfo = obj;
    //     sessionStorage.setItem("sqfb_previewInfo", JSON.stringify(obj));
    // },
    // setUserInfo(state, obj) {
    //     state.userInfo = obj;
    //     localStorage.setItem("sqfb_userInfo", JSON.stringify(obj));
    // },
    // setToken(state, str) {
    //     state.token = str;
    //     localStorage.setItem("sqfb_userInfo", str);
    // },
    setNewUser(state, flag) {
      state.newUser = flag;
      // localStorage.setItem("sqfb_newUser", flag);
    },
    setUserType(state, type) {
      state.userType = type;
    },
    setHobbyActive(state, i) {
      state.hobbyActive = i;
    },
    setLmActive(state, i) {
      state.lmActive = i;
    }
  },
  actions: {}
});
