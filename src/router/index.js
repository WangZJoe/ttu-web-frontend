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
        redirect: '/main/realTime',
        component: () => import('../layout/mainView/mainView.vue'),
        children: [
            {
                path: "realTime",
                component: () => import('../layout/menuView/realTimeMonitoring/realTimeMonitoring.vue'),
            },
            {
                path: "historyStandingBook",
                component: () => import('../layout/menuView/historyStandingBook/historyStandingBook.vue'),
            },
            {
                path: "warnEvent",
                component: () => import('../layout/menuView/warnEvent/WarnEvent.vue'),
            },
            {
                path: "errorState",
                component: () => import('../layout/menuView/errorState/ErrorState.vue'),
            },
            {
                path: "paramsSetting",
                component: () => import('../layout/menuView/paramsSetting/paramsSetting.vue'),
            },
            {
                path: "leakageAnalysis",
                component: () => import('../layout/menuView/leakageAnalysis/leakageAnalysis.vue'),
            }
        ]
    },
]


const router = new VueRouter({
    mode: 'hash',
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