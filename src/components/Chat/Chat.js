import {
  Divider,
  Actionsheet,
  XHeader,
  TransferDom,
  Popup,
  Tab,
  TabItem,
  Tabbar,
  TabbarItem,
  XButton,
  XInput,
  Grid,
  GridItem,
  Group } from 'vux';

import { logout, getOthers } from '../../api/api';
// const socket = null;

export default {
  name: 'Chat',
  directives: {
    TransferDom,
  },
  components: {
    Divider,
    Actionsheet,
    XHeader,
    Popup,
    Tab,
    TabItem,
    Tabbar,
    TabbarItem,
    XButton,
    XInput,
    Grid,
    GridItem,
    Group,
  },
  data() {
    return {
      people: [],
      talkingTo: -1,
      talkToPeople: [],
      showMenus: false,
      message: '',
    };
  },
  mounted() {
    const socket = window.io('http://localhost:8080');
    const that = this;
    // 告诉socket server该用户登录的动作
    socket.emit('login');
    // 监听socket server其他用户登录的消息
    socket.on('someOneLogin', ({ user, msg }) => {
      that.people.push({
        label: user.username,
        value: user.sessionId,
      });
      console.log(msg);
    });
    // 监听socket server 的广播
    socket.on('broadcast', (data) => {
      console.log(data);
    });
    socket.on('private', (data) => {
      console.log(data);
    });

    // 聊天室成员
    getOthers((others) => {
      that.people.splice(0);
      others.map((other) => {
        that.people.push({
          label: other.username,
          value: other.sessionId,
        });
        return true;
      });
    });
  },
  methods: {
    sendMsg() {
      const socket = window.io('http://localhost:8080');
      if (this.message.trim() !== '') {
        // 非群聊
        if (this.talkingTo !== -1) {
          console.log(this.people[this.talkingTo]);
          let sessionId = this.people[this.talkingTo].value;

          // 发送私聊消息
          socket.emit('private', {
            msg: this.message,
            toSessionId: sessionId,
          });
          // 清除输入框
          this.message = '';

        // 群聊
        } else {
          // 发送群聊消息
          socket.emit('broadcast', {
            msg: this.message,
          });
          // 清除输入框
          this.message = '';
        }
      } else {
        this.$vux.alert.show({
          title: '发送消息不能为空！',
        });
      }
    },
    talkToThis(index) {
      this.talkingTo = index;
    },
    choosePerson(value) {
      for (let i = 0; i < this.people.length; i += 1) {
        if (this.people[i].value === value) {
          if (this.talkToPeople.includes(i)) {
            this.talkingTo = i;
          } else {
            this.talkToPeople.push(i);
            this.talkingTo = i;
          }
          break;
        }
      }
    },
    logout() {
      const that = this;
      this.$vux.confirm.show({
        title: '确定要退出聊天室吗？',
        onConfirm() {
          logout(that);
        },
      });
    },
  },
};
