<template>
  <div>
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">
      {{ talkingTo === -1 ? '群聊' : people[talkingTo].label}}
    </x-header>
    <tab>
      <tab-item @on-item-click="talkToThis(-1)" >
          群聊
        </tab-item>
      <template v-for="(person,index) in people">
        <tab-item @on-item-click="talkToThis(index)" >
          {{person.label}}
        </tab-item>
      </template>
    </tab>

    <div v-transfer-dom>
      <popup v-model="showMenus">
        <div class="popup0">
          <actionsheet v-model="showMenus" :menus="people" show-cancel></actionsheet>
        </div>
      </popup>
    </div>
    <divider>我是有底线的</divider>
  </div>
</template>

<script>

import Chat from './Chat.js';

export default Chat;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

@import './Chat.less';

</style>
