import Vue from 'vue';
import Router from 'vue-router';
import Chat from '@/components/Chat/index';
import Login from '@/components/Login/index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/chat',
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});
