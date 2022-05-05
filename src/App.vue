<template>
    <div id="app">
        <login @changeToView=changeToView v-if="!LoggedOn"></login>
        <mainView v-if="LoggedOn"></mainView>
    </div>
</template>

<script>
import login from "./layout/login/login.vue"
import mainView from "./layout/mainView/mainView.vue";
export default {
    components: { mainView , login },
    data(){
        return{
            LoggedOn:false
        }
    },
    methods: {
        changeToView(){
            this.LoggedOn=true
        }
    },
};
</script>

<style lang="scss">
/* 页面初始化样式 */
@import "./styles/reset.scss";
@import "./assets/font/font.css";
#app {
    width: 100%;
    height: 100%;
}
</style>
