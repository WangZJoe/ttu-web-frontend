import Vue from "vue";
import LoginVue from "~/layout/login/the-login.vue";
/* 页面初始化样式 */
import "./styles/reset.scss";
new Vue({
  render(h) {
    return h(LoginVue);
  },
}).$mount("#login-app");
