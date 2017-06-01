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

import { actions } from "./store";
import Card from "./components/card";
import List from "./components/list";
import myText from "./components/myText";
import Message from "./components/message";
import store from "./store.js";
import mobileHeader from "./components/mobileHeader.vue";
import axios from "axios";
import { mapState } from 'vuex'
var now = new Date();

export default {
  store: store,
  vuex: {
    actions: actions
  },
  name: "Chat",
  components: {
    Card, List, myText, Message, mobileHeader
  },
  data() {
    return {
      people: [],
      talkingTo: -1,
      talkToPeople: [],
      showMenus: false,
      message: "",
      menus: {
        menu1: "Take Photo",
        menu2: "Choose from photos"
      },
      showSidebar: false
    };
  },
  created(){
    //获取登录用户信息
    axios.get("/api/testLogin")
    .then(({data}) => {
      this.initData({id:data.id,name:data.username});
      this.getUserName({id:data.id,name:data.username});//设置登录用户
    })
    .catch((err) => {
      console.log(err);
    });

  },
  mounted() {
    const socket = window.io('http://localhost:8080');
    const that = this;
    // 告诉socket server该用户登录的动作
    socket.emit('login');
    // 监听socket server其他用户登录的消息
    socket.on('someOneLogin', (data) => {
      console.log(data);
    });
    // 监听socket server 的广播
    socket.on('broadcast', (data) => {
      console.log(data);
    });
    socket.on('private', (data) => {
      console.log(data);
    });

    // 聊天室成员
    setInterval(() => {
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
    }, 2000);
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
            toSessionId: sessionId
          });
          // 清除输入框
          this.message = "";

        // 群聊
        } else {
          // 发送群聊消息
          socket.emit('broadcast', {
            msg: this.message,
          });
          // 清除输入框
          this.message = "";
        }
      } else {
        this.$vux.alert.show({
          title: "发送消息不能为空！"
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
        title: "提示",
        content: "确定要退出聊天室吗？",
        onConfirm() {
          logout(that);
        }
      });
    },
    /*侧边栏状态管理*/
    trigger(){
      this.showSidebar = !this.showSidebar;
    }
  },
};
