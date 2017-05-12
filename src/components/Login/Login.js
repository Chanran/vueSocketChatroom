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
      if (this.username.trim() !== '') {
        console.log(this.$http('/api/login'));
        console.log(this.username);
      } else {
        this.$vux.alert.show({
          title: '用户名不能为空',
        });
      }
    },
  },
};
