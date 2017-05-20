import {
  XInput,
  XButton,
  Cell,
  Group } from 'vux';

import { login } from '../../api/api';

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
        login(this, username);
      } else {
        this.$vux.alert.show({
          title: '用户名不能为空',
        });
      }
    },
  },
};
