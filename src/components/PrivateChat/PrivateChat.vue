<template>
  <div>
    <template v-for="record in records">
      <div class="record" v-if="record.sessionId !== user.sessionId && record.sessionId !== ''">
        <avatar class="avatar" :name="record.username"></avatar>
        <span class="name">{{record.username}}</span>
        <span class="msg clearfix"><div class="msg-inner">{{record.msg}}</div></span>
        <span class="time">{{record.time}}</span>
      </div>
      <div class="record-now" v-else-if="user.sessionId === record.sessionId && user.sessionId !== ''">
        <avatar class="avatar" :name="record.username"></avatar>
        <span class="name">{{record.username}}</span>
        <span class="msg clearfix"><div class="msg-inner">{{record.msg}}</div></span>
        <span class="time">{{record.time}}</span>
      </div>
      <divider class="tip-msg" v-if="record.tip === true">{{record.msg}}</divider>
    </template>
  </div>
</template>

<script>

  import PrivateChat from './PrivateChat.js';

  export default PrivateChat;

</script>

<style lang="less" scoped>
  @import './PrivateChat.less';
</style>
