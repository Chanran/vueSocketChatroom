<template>

<div>
  <header id="banner">
    <h1>Socket Chat</h1>
  </header>
  <section id="chatroom">
      <div id="login">
          <form method="post" action="/chat/login" enctype="application/x-www-form-urlencoded">
              <input name="name" type="text" placeholder="输入名字" required/>
              <input type="submit" value="登录"/>
          </form>
      </div>
  </section>
  <footer>
      Hope you enjoy your stay here
  </footer>
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
