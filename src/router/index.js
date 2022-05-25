import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

import Login from "../layout/login/login.vue";
import Main from "../layout/mainView/mainView.vue";

export default new VueRouter({
    mode: "history", // hash 表示以地址栏的哈希值作为路径，history以历史对象的url作为路径
    routes: [  // 路由列表，里面的每一个成员都是一个url地址和组件的映射关系
        {
            path: "/",
            component: Home,
        },
        {
            path: "/hi",
            component: Login,
        },
        {
            path: "/index",
            component: Main,
        }
    ]
});