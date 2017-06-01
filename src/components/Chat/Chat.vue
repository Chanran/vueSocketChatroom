<script>
  import Chat from './Chat.js';
  export default Chat;
</script>

<template>
  <div id="chat" >
    <div :class="{sidebar:true, 'active': showSidebar}">
      <card></card>
      <list></list>
    </div>
    <div id="mask" :class="{'active': showSidebar}" @click="trigger"></div>
    <div class="main">
      <mobile-header  v-on:triggerSidebar="trigger">
        <p slot="title">聊天对象</p>
      </mobile-header>
      <message></message>
      <my-text></my-text>
    </div>
  </div>
</template>

<style lang="less" scoped>
 @import "./Chat.less";
</style>
