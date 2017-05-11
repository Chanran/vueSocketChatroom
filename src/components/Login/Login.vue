<template>
  <div class="login-container">

    <div class="main">
      <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <x-input v-model="username" title="用户名" placeholder="请输入用户名"></x-input>
        <x-input v-model="password" title="密码" type="password" placeholder="请输入密码"></x-input>
        <x-button type="primary" text="登录"></x-button>
      </group>
    </div>

  </div>

</template>

<script>

import Login from './Login.js';

export default Login;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

@import './Login.less';

</style>
