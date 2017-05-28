<script>
  import { actions } from '../store';
  import { logout } from '../../../api/api';
  export default {
    vuex: {
      actions: actions,
      getters: {
        user: ({user}) => user,
        filterKey: ({filterKey}) => filterKey
      }
    },
    methods: {
      onKeyup (e) {
        this.search(e.target.value);
      },
      logout() {
        const that = this;
        this.$vux.confirm.show({
          title: '确定要退出聊天室吗？',
          onConfirm() {
            logout(that);
          },
        });
      }
    }
  }
</script>

<template>
  <div class="card">
    <header title="退出登录" @click="logout">
      <img class="avatar" width="40" height="40" :alt="user.name" :src="user.img">
      <p class="name">{{user.name}}</p>
      <span class="logout"></span>
    </header>
    <footer>
      <input class="search" type="text" placeholder="search user..." @keyup="onKeyup">
    </footer>
  </div>
</template>

<style scoped lang="less">
  .card {
    padding: 12px;
    border-bottom: solid 1px #24272C;
    header {
      cursor: pointer;
      position: relative;
      .logout {
        display: block;
        width: 24px;
        height: 24px;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -12px;
        background:url("../../../../static/images/logout.png") center center;
      }
      &:hover .logout{
        background:url("../../../../static/images/logout_hover.png") center center;
      }
    }
    footer {
      margin-top: 10px;
    }

    .avatar, .name {
      vertical-align: middle;
    }
    .avatar {
      border-radius: 2px;
    }
    .name {
      display: inline-block;
      margin: 0 0 0 15px;
      font-size: 16px;
    }
    .search {
      padding: 0 10px;
      width: 100%;
      font-size: 12px;
      color: #FFFFFF;
      height: 30px;
      line-height: 30px;
      border: solid 1px #3A3A3A;
      border-radius: 4px;
      outline: none;
      background-color: #26292E;
    }

  }
</style>
