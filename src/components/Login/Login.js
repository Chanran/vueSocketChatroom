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
      password: '',
    };
  },
};
