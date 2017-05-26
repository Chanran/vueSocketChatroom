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
    const that = this;
    this.$socket.emit('login');
    getOthers((others) => {
      that.people.splice(0);
      others.map((other) => {
        that.people.push({
          label: other.name,
          value: other.sessionId,
        });
        return true;
      });
    });
  },
  methods: {
    sendMsg() {
      if (this.message.trim() !== '') {
        this.$socket.emit('private', {
          msg: this.message,
          toSessionId: 'test',
        });
        this.message = '';
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
