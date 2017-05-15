import {
  XInput,
  XButton,
  Cell,
  Group } from 'vux';

export default {
  name: 'Login',
  components: {
    XInput,
    XButton,
    Cell,
    Group,
  },
  data() {
    return {
      username: '',
    };
  },
  methods: {
    login() {
      let username = this.username;
      if (this.username.trim() !== '') {
        this.$http.get('/api/login', {
          params: {
            username,
          },
        });
      } else {
        this.$vux.alert.show({
          title: '用户名不能为空',
        });
      }
    },
  },
};
