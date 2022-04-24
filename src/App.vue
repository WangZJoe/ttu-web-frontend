<template>
    <div id="app">
        <mainView></mainView>
    </div>
</template>

<script>
import mainView from "./layout/mainView/mainView.vue";
export default {
    components: { mainView },
    methods: {},
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
