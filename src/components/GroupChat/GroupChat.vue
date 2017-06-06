<template>
  <div>
    <template v-for="record in records">
      <avatar :name="record.username"></avatar>
    </template>
  </div>
</template>

<script>

  import GroupChat from './GroupChat.js';

  export default GroupChat;

</script>

<style lang="less" scoped>
  @import './GroupChat.less';
</style>
