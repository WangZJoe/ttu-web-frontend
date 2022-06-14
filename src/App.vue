<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>

<style lang="scss">
/* 页面初始化样式 */
@import "./styles/reset.scss";
@import url("//unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css");
#app {
    width: 100%;
    height: 100%;
}
</style>
