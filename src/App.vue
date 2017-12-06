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

.clearfix{overflow:hidden;_zoom:1;}
.clearfix {
  zoom: 1;
  display: table;
  width: 100%;
}

</style>
