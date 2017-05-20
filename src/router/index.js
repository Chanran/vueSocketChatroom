import Vue from 'vue';
import Router from 'vue-router';
import Chat from '@/components/Chat/';
import Login from '@/components/Login/';
import NotFound from '@/components/NotFound/';

import { checkLogin } from '../api/api';

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
      beforeEnter: (to, from, next) => {
        checkLogin(to, from, next, '', '/login');
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        checkLogin(to, from, next, '/chat', '');
      },
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});
