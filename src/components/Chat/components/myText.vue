<script>
  import { actions } from '../store';

  export default {
    vuex: {
      actions: actions,
      getters:{
        user: ({user}) => user,
        sessions: ({sessions}) => sessions
      }
    },
    data () {
      return {
        content: ''
      };
    },
    methods: {
      onKeyup (e) {
        if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
          this.sendMessage(this.user.id,this.user.name,this.content);
          this.content = '';
        }
      },
      addPerson(sessions){
        var id = Math.floor(Math.random()*100);
        var name ="克隆体 "+id+"号";
        sessions.push({
          user: {
            name: name,
            id: id
          },
          messages:[{
            name: name,
            sessionId: id,
            content: "你好,我是"+name,
            date:new Date()
          }]
        })
      }
    }
  };
</script>

<template>
  <div class="text  inputMessage">
    <textarea placeholder="可按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
    <a href="javascript:void(0)" class="sendbtn" @click="addPerson(sessions)">发送</a>
  </div>
</template>

<style lang="less" scoped>
  .text {
    border-top: solid 1px #DDDDDD;
    textarea {
      padding: 20px 10px 10px;
      height: 100%;
      width: 100%;
      border: none;
      outline: none;
      font-family: "Micrsofot Yahei";
      resize: none;
      box-sizing: border-box;
    }
  }

  .inputMessage {
    position: relative;
    height: 25%;
    padding-bottom: 40px;
    padding-top: 10px;
    box-sizing: border-box;
    background-color: #FFFFFF;
  }

  .sendbtn {
    position: absolute;
    width: 70px;
    height: 20px;
    -webkit-border-radius: 1px 1px;
    -moz-border-radius: 1px 1px;
    border-radius: 1px 1px;
    border: 1px #E1E1E1 solid;
    color: #606060;
    text-align: center;
    /*left: 50%;*/
    /*top: 50%;*/
    right: 30px;
    bottom: 3px;
    padding: 3px;
    &:hover {
      background-color: #EEEEEE;
    }
  }
</style>
