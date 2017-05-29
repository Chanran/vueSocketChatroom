<script>
  import { actions } from '../store';
  import avatar from './avatar.vue';
  export default {
    vuex: {
      actions: actions,
      getters: {
        // 过滤后的会话列表
        sessions: ({sessions, filterKey}) => {
          let result = sessions.filter(session => session.user.name.includes(filterKey));
          return result;
        },
        // 当前会话index
        currentId: ({currentSessionId}) => currentSessionId
      }
    },
    components:{
      avatar
    }
  };
</script>

<template>
  <div class="list">
    <ul>
      <li v-for="item in sessions" :class="{ active: item.user.id === currentId }" @click="selectSession(item.user.id)">
        <avatar :user="item.user"></avatar>
        <p class="name">{{item.user.name}}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
  .list {

    li {
      padding: 12px 15px;
      border-bottom: 1px solid #292C33;
      cursor: pointer;
      transition: background-color .1s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.03);
      }
      &.active {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .name {
      display: inline-block;
      margin: 0 0 0 15px;
    }
  }
</style>
