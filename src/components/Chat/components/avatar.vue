<template>
  <a :title="getTitle" class="avatar" :class="{'clickable':canClick}" @click="openSession(canClick)">
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0"
            width="40" height="40"
            rx="2" ry="2" fill="#ffffff"/>
      <!--英语x为10，汉字x为5-->
      <text :x="getX" y="30" fill="#86AF6C" font-size="30">{{ this.user.name && this.user.name.charAt(0)}}</text>
    </svg>
  </a>
</template>
<style lang="less" scoped>
  .avatar, .name {
    vertical-align: middle;
    display: inline-block;

  }

  .avatar {
    border-radius: 2px;
    cursor: hand;
    &.clickable {
      cursor: pointer;
    }
  }
</style>
<script>
  import { actions } from '../store';
  export default {
    vuex: {
      actions: actions,
      getters:{
        sessions:({sessions}) => sessions
      }
    },
    name: "avatar",
    props: ['user', 'hasTitle', 'session', 'canClick'],
    computed: {
      getX(){
        let firstLetterCode = this.user.name && this.user.name.charCodeAt(0);
        /*是否为字母*/
        if ((firstLetterCode >= 65 && firstLetterCode <= 90) || (firstLetterCode >= 97 && firstLetterCode <= 122)) {
          return 10;
        } else return 5;
      },
      getTitle(){
        if (this.hasTitle) {
          return this.user.name;
        }
      }
    },
    methods: {
      openSession(canClick){
        if (canClick) {
          console.log("this.session:",this.session);
          var isLoginSession = this.sessions.find(session => session.user.id === this.session);
          console.log('isLoginSession',isLoginSession);
          if(isLoginSession){
            this.selectSession(this.session);
          }else{
            console.log('该用户已退出登录，无法私聊');
            this.selectSession(-1);//fallback 到群聊
          }
        }
      }
    }
  }
</script>
