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
      let that = this;
      let username = this.username;
      if (this.username.trim() !== '') {
        this.$http.get('/api/login', {
          params: {
            username,
          },
        })
        .then(({ data }) => {
          console.log(data);
          if (parseInt(data.code, 10) === 200) {
            that.$router.push('/chat');
          } else {
            that.$vux.alert.show({
              title: data.msg,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        this.$vux.alert.show({
          title: '用户名不能为空',
        });
      }
    },
  },
};
