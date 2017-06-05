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
  axios.get('/api/testlogin')
    .then(({ data }) => {
      // console.log(data);
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

/**
 * 登录
 *
 * @export function
 * @param {object} vueInstance vuejs的实例
 * @param {string} username 用户名
 */
export function login(vueInstance, username) {
  axios.get('api/login', {
    params: {
      username,
    },
  })
  .then(({ data }) => {
    // console.log(data);
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

/**
 * 退出登录
 *
 * @export function
 * @param {object} vueInstance vuejs的实例
 */
export function logout(vueInstance) {
  axios.get('/api/logout')
  .then(({ data }) => {
    // console.log(data);
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

/**
 * 取得在线人的列表
 *
 * @export function
 */
export function getOthers(cb, errorCb) {
  axios.get('/api/others')
  .then(({ data }) => {
    if (parseInt(data.code, 10) === 200) {
      cb(data.data);
    } else {
      console.log(data.msg);
    }
  })
  .catch((err) => {
    errorCb(err);
  });
}

export function getRecords(cb, errorCb) {
  axios.get('/api/records')
  .then(({ data }) => {
    if (parseInt(data.code, 10) === 200) {
      cb(data.data);
    } else {
      console.log(data.msg);
    }
  })
  .catch((err) => {
    errorCb(err);
  });
}
