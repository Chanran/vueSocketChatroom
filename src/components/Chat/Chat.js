import { actions } from "./store";
import Card from "./components/card";
import List from "./components/list";
import myText from "./components/myText";
import Message from "./components/message";
import store from "./store.js";
import { XHeader, Actionsheet, TransferDom } from "vux";
import mobileHeader from "./components/mobileHeader.vue";
import axios from "axios";
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
  sockets: {
    connect() {
      console.log("socket conneted");
    },
    broadcast(data) {
      console.log(data);
    }
  },
  beforeMount(){

  },
  mounted() {
    const that = this;
    // 告诉socket server该用户登录的动作
    this.$socket.emit("login");
    // 监听socket server其他用户登录的消息
    this.$socket.on("someOneLogin", (data) => {
      console.log(data);
    });

    this.$socket.on("broadcast", (data) => {
      console.log(data);
    });

    // 聊天室成员
    // getOthers((others) => {
    //   that.people.splice(0);
    //   others.map((other) => {
    //     that.people.push({
    //       label: other.name,
    //       value: other.sessionId,
    //     });
    //     return true;
    //   });
    // });
    //获取登录用户信息
    axios.get("/api/testLogin")
    .then(({data}) => {
      this.getUserName(data.username);
    })
    .catch((err) => {
      console.log(err);
    });
  },
  methods: {
    sendMsg() {
      if (this.message.trim() !== "") {
        // 非群聊
        if (this.talkingTo !== -1) {
          let sessionId = this.people[this.talkToThis].sessionId;

          // 发送私聊消息
          this.$socket.emit("private", {
            msg: this.message,
            toSessionId: sessionId
          });
          // 清除输入框
          this.message = "";

          // 群聊
        } else if (this.talkingTo === -1) {
          // 发送群聊消息
          this.$socket.emit("broadcast", {
            msg: this.message
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
  }

};
