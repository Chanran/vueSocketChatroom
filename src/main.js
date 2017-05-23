// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io';
import { AlertPlugin, ConfirmPlugin } from 'vux';
import router from './router/index';
import App from './App';

Vue.use(VueSocketio, 'http://localhost:3000'); // 代理http://localhost:3000的socket
Vue.use(VueRouter); // 使用vue-router
Vue.use(AlertPlugin); // 使用alert插件
Vue.use(ConfirmPlugin); // 使用confirm插件

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app-box');
