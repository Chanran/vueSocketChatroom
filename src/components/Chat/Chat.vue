<template>
  <div class="container">

    {{ /* 头部内容 */ }}
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">
      {{ talkingTo === -1 ? '群聊' : people[talkingTo].label}}
    </x-header>

    {{ /* 聊天标签页切换 */ }}
    <tab>
      <tab-item @on-item-click="talkToThis(-1)" selected>
          群聊
        </tab-item>
      <template v-for="(person, index) in people">
        <tab-item @on-item-click="talkToThis(index)" >
          {{person.label}}
        </tab-item>
      </template>
    </tab>

    {{ /* 聊天标签页聊天记录 */ }}
    <div class="chat-container" v-if="talkingTo === -1">
        群聊
    </div>
    <template v-for="(person, index) in people">
      <div class="chat-container" v-if="talkingTo === index">
        {{person.label}}
      </div>
    </template>

    {{ /* 选择聊天室里的人 */ }}
    <div v-transfer-dom>
      <popup v-model="showMenus">
        <div class="popup0">
          <actionsheet v-model="showMenus" :menus="people" show-cancel></actionsheet>
        </div>
      </popup>
    </div>

    {{ /* 聊天记录底部 */ }}
    <divider>我是有底线的</divider>

    {{ /* 替代置底输入框的block */ }}
    <div class="replace-block"></div>
    {{ /* 置底输入框 */ }}
    <div class="bottom-input">
      <input class="input" :value="message" placeholder="输入..." />
      <x-button class="button" type="primary">发送</x-button>
    </div>
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
