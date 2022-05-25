import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "./router/index";
import App from './App.vue'
import moment from "moment"

Vue.prototype.$moment = moment;
Vue.use(ElementUI)
Vue.use(router)
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
