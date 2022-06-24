import Vue from 'vue'
import LoginVue from "~/layout/login/login.vue"

new Vue({
    render(h) {
        return h(LoginVue)
    }
}).$mount('#login-app')