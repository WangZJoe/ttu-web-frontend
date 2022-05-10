<template>
    <div class="login">
        <div class="header">
            <img src="../../assets/img/login-logo.png" alt="">
            <span class="title">低压台区漏电管家</span>
        </div>
        <div class="body">
            <div class="left"></div>
            <div class="right"></div>
            <div class="main">
                <div class="main-title"><span>您好，欢迎登陆！</span></div>
                <div class="main-body">
                <input type="text" class="user" v-model="user" placeholder="账号">
                <input type="password" class="password" v-model="password" placeholder="密码"></div>
                <div class="main-button">
                <el-button class="button" @click="Login">登录</el-button></div>
            </div>

        </div>
    </div>
</template>

<script>
//上传用户名和密码
// import { GetDeviceList } from "../../api/api";
export default {
    components: {  },
    data() {
        return {
            user:'',
            password:''
        }
    },
    methods: {
        Login(){
            //用户名和密码校验逻辑
            if(this.user != '' && this.password != ''){
                this.$emit('changeToView', true)
            }
        }
    },
};
</script>
<style lang="scss">
@import "./login.scss";
</style>