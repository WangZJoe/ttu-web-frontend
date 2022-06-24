import Vue from "vue";
// import ElementUI from "element-ui";
import "./element-ui";
// import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import moment from "moment";
import "./assets/font/font.css";

Vue.prototype.$moment = moment;
// Vue.use(ElementUI);

new Vue({
  el: "#app",
  store,
  router,
  render: (h) => h(App),
});
