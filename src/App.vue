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

html,body,#app {
    height: 100%;
}
body {
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
    margin: 0px;
    padding: 0px;
}

</style>
