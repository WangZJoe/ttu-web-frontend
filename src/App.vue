<template>
    <div id="app">
        <Frame></Frame>
    </div>
</template>

<script>
import Frame from "./layout/mainView/Frame.vue";
export default {
    components: { Frame },
    methods: {},
};
</script>

<style lang="scss">
@import "./assets/font/SourceHanSansCN-Medium.css";
/* 页面初始化样式 */
@import "./styles/reset.scss";
#app {
    width: 100%;
    height: 100%;
}
</style>
