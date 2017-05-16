import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import Chat from '@/components/Chat/';
import Login from '@/components/Login/';
import NotFound from '@/components/NotFound/';

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
        axios.get('/api/testLogin')
        .then(({ data }) => {
          if (parseInt(data.code, 10) === 200) {
            console.log(data);
            next();
          } else {
            console.log(data);
            next('/login');
          }
        })
        .catch((err) => {
          console.log(err);
          next('/login');
        });
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});
