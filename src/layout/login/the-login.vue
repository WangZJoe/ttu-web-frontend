<template>
  <div class="login">
    <div class="header">
      <img src="../../assets/img/login-logo.png" alt="" />
      <span class="title">低压台区漏电管家</span>
    </div>
    <div class="body">
      <div class="left"></div>
      <div class="bkg"></div>
      <div class="main" v-loading="LoginLoading">
        <p class="main-title">您好，欢迎登陆！</p>
        <div class="user-input">
          <div class="user-icon"></div>
          <input
            type="text"
            class="user"
            v-model="username"
            placeholder="账号"
          />
          <div class="underline"></div>
        </div>
        <div class="password-input">
          <div class="password-icon"></div>
          <input
            type="password"
            class="password"
            v-model="password"
            placeholder="密码"
          />
          <div class="underline"></div>
        </div>
        <button class="main-button el-button" @click="Login">登录</button>
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
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
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
      this.loginParams(params);
    },
    //登录
    async loginParams(params) {
      let res = await LoginParams(params);
      if (res.data.code != 0) {
        alert("登录请求失败");
      } else {
        let code = res.data.data.code;
        let status = res.data.data.status;
        if (code == "0") {
          alert(status);
          this.LoginLoading = false;
        } else if (code == "1") {
          alert(status);
          window.sessionStorage.setItem("token", code);
          location.href = "index.html";
          // location.href = "/";
          this.LoginLoading = false;
        }
      }
    },
  },
};
</script>
<style lang="scss">
@import "./login.scss";
</style>
