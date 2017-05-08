<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html,#app {
    height: 100%;
}
body {
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
    margin: 0px;
    padding: 0px;
    height: -moz-calc(100% - 20px);
    height: -webkit-calc(100% - 20px);
    height: calc(100% - 20px);
}

</style>
