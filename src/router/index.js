import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [  // 路由列表，里面的每一个成员都是一个url地址和组件的映射关系
    {
        path: "/",
        redirect: '/login',
    },
    {
        path: "/login",
        component: () => import('../layout/login/login.vue'),
    },
    {
        path: "/main",
        component: () => import('../layout/mainView/mainView.vue'),
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const token = window.sessionStorage.getItem('token');
    console.log(token);
    if (token || to.path == '/login') {
        next()
    } else {
        next('/login')
    }
})

export default router