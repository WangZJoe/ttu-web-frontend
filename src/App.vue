<template>
  <div id="app">
    <link rel="shortcut icon" href="#"/>
    <Frame></Frame>
  </div>
</template>

<script>
import Frame from './Frame.vue'
export default {
  components: { Frame },
  methods: {
  }
}
</script>

<style>
@import "./assets/font/SourceHanSansCN-Medium.css";
#app {
  background: #F0F7FD;
  font-family: 'Source Han Sans CN-Medium, Source Han Sans CN';
  font-weight: 500;
}
</style>
