<script>
  import avatar from './avatar.vue';
  export default {
    vuex: {
      getters: {
        user: ({user}) => user,
        session: function ({sessions, currentSessionId}) {
          var result = sessions.find(session => session.user.id === currentSessionId);
          if (!result) {
           result =  sessions.find(session => session.user.id === -1);
          }
          return result;
        },
      }
    },
    filters: {
      // 将日期过滤为 hour:minutes
      time (date) {
        if (typeof date === 'string') {
          date = new Date(date);
        }
        return date.getHours() + ':' + date.getMinutes();
      }
    },
    components: {
      avatar
    }
//

  };
</script>

<template>
  <div class="message" v-scroll-bottom="session.messages">
    <ul v-if="session">
      <li v-for="item in session.messages">
        <p class="time">
          <span>{{ item.date | time }}</span>
        </p>
        <div class="main" :class="{ self: item.self }">
          <avatar v-if="item.self" :user="user"></avatar>
          <avatar :session="item.sessionId" :canClick="session.user.id===-1" v-else="item.self" :hasTitle="true" :user="item"></avatar>
          <div class="text">{{ item.content }} </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
  .message {
    padding: 10px 15px;
    overflow-y: auto;
    box-sizing: border-box;
    li {
      margin-bottom: 15px;
      list-style: none;
    }
    .time {
      margin: 7px 0;
      text-align: center;

      > span {
        display: inline-block;
        padding: 0 18px;
        font-size: 12px;
        color: #FFFFFF;
        border-radius: 2px;
        background-color: #DCDCDC;
      }
    }
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;

    }
    .text {
      display: inline-block;
      position: relative;
      padding: 10px;
      max-width: 65%;
      line-height: 1.5;
      font-size: 14px;
      text-align: left;
      word-break: break-all;
      background-color: #FAFAFA;
      border-radius: 4px;
      &:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #FAFAFA;
      }
    }

    .self {
      text-align: right;

      .avatar {
        float: right;
        margin: 0 0 0 10px;
      }
      .text {
        background-color: #B2E281;

        &:before {
          right: inherit;
          left: 100%;
          border-right-color: transparent;
          border-left-color: #B2E281;
        }
      }
    }

  }
</style>
