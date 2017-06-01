// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import { AlertPlugin, ConfirmPlugin } from 'vux';
import router from './router/index';
import App from './App';


Vue.prototype.$socketIoClient = window.io; // 将socket client赋给Vue实例
Vue.use(VueRouter); // 使用vue-router
Vue.use(AlertPlugin); // 使用alert插件
Vue.use(ConfirmPlugin); // 使用confirm插件

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
// 发送消息后滚动到底部
Vue.directive('scroll-bottom',function(el,binding){
  Vue.nextTick(function () {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  });
});
let vue = new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box');
