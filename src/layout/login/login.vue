<template>
    <div class="login">
        <div class="header">
            <img src="../../assets/img/login-logo.png" alt="" />
            <span class="title">低压台区漏电管家</span>
        </div>
        <div class="body">
            <div class="left"></div>
            <div class="right"></div>
            <div class="main" v-loading="LoginLoading">
                <div class="main-title"><span>您好，欢迎登陆！</span></div>
                <div class="main-body">
                    <input
                        type="text"
                        class="user"
                        v-model="username"
                        placeholder="账号"
                    />
                    <input
                        type="password"
                        class="password"
                        v-model="password"
                        placeholder="密码"
                    />
                </div>
                <div class="main-button">
                    <el-button class="button" @click="Login">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//上传用户名和密码
import { LoginParams } from "../../api/api";
export default {
    components: {},
    data() {
        return {
            username: "",
            password: "",
            LoginLoading: false,
        };
    },
    methods: {
        Login() {
            let params = {
                username: this.username,
                password: this.password,
            };
            this.LoginLoading = true;
            this.password = null;
            window.sessionStorage.setItem("token", "1");
            this.$router.push("main");
            this.loginParams(params);
        },
        //登录
        async loginParams(params) {
            if (params) {
                let res = await LoginParams(params);
                if (res.data.code != 0) {
                    this.$message.error("登录请求失败");
                } else {
                    let code = res.data.data.code,
                        status = res.data.data.status;
                    if (code == "0") {
                        this.$message.error(status);
                        this.LoginLoading = false;
                    } else if (code == "1") {
                        window.sessionStorage.setItem("token", code);
                        this.$router.push("main");
                        this.LoginLoading = false;
                    }
                }
            }
        },
    },
};
</script>
<style lang="scss">
@import "./login.scss";
</style>