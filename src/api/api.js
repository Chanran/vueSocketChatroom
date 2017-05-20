import axios from 'axios';

/**
 * 检查登录状态
 *
 * @param {func} to
 * @param {func} from
 * @param {func} next
 * @param {string} [loginNextRoute=''] 已登录的跳转链接
 * @param {string} [logoutNextRoute=''] 未登录的跳转链接
 * @param {string} [ErrorNextRoute=''] 异步请求客户端错误跳转链接
 */
export function checkLogin(to, from, next, loginNextRoute = '', logoutNextRoute = '', ErrorNextRoute = '') {
  axios.get('/api/testLogin')
    .then(({ data }) => {
      console.log(data);
      if (parseInt(data.code, 10) === 200) {
        loginNextRoute === '' ? next() : next(loginNextRoute);
      } else {
        logoutNextRoute === '' ? next() : next(logoutNextRoute);
      }
    })
    .catch((err) => {
      console.log(err);
      ErrorNextRoute === '' ? next(ErrorNextRoute) : next('/login');
    });
}

export function login(vueInstance, username) {
  axios.get('/api/login', {
    params: {
      username,
    },
  })
  .then(({ data }) => {
    console.log(data);
    if (parseInt(data.code, 10) === 200) {
      vueInstance.$router.push('/chat');
    } else {
      vueInstance.$vux.alert.show({
        title: data.msg,
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

export function logout(vueInstance) {
  axios.get('/api/logout')
  .then(({ data }) => {
    console.log(data);
    if (parseInt(data.code, 10) === 200) {
      vueInstance.$router.push('/login');
    } else {
      vueInstance.$vux.alert.show({
        title: data.msg,
      });
    }
  })
  .catch((err) => {
    console.log(err);
    console.log(vueInstance);
    vueInstance.$vux.alert.show({
      title: err,
    });
  });
}

export function getAllPeople() {
  axios.get('/api/getAllPeople');
}
