/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const now = new Date();
const store = new Vuex.Store({
  state: {
    // 当前用户
    user: {
      name: "",
      id: ""
    },
    // 会话列表
    sessions: [
      {
        //群聊(id 与 sessionId 不同)
        //如果id为非-1，则为私聊
        user:{
          name:"群聊",
          id: -1
        },
        //该item的所有聊天信息
        messages: [
          {
            name: "群聊",
            sessionId: -1,
            content: "欢迎来到群聊界面！",
            date: now
          },
          {
            name: "Geekaholic",
            sessionId: 3,
            content: "小组成员Geekaholic!",
            date: now
          },
          {
            name: "Blue",
            sessionId: 7,
            content: "小组成员Blue！",
            date: now
          },
          {
            name: "Coco",
            sessionId: 329,
            content: "小组成员Coco！",
            date: now
          }
        ]
      },
      {
        //私聊(id 与 sessionId 相同)
        user:{
          name:"Geekaholic",
          id: 3
        },
        messages: [
          {
            name: "Geekaholic",
            sessionId: 3,
            content: "你好，我是Geekaholic！",
            date: now
          }
        ]
      },
      {
        user: {
          id: 7,
          name: "Blue"
        },
        messages: [
          {
            name: "Blue",
            sessionId: 7,
            content: "你好，我是Blue！",
            date: now
          }
        ]
      },
      {
        //(id 与 sessionId 相同)
        user:{
          id: 323,
          name: "Coco"
        },
        messages: [
          {
            name: "Coco",
            sessionId: 323,
            content: "你好，我是Coco！",
            date: now
          }
        ]
      }
    ],
    // 当前选中的会话
    currentSessionId: -1,
    // 过滤出只包含这个key的会话
    filterKey: ""
  },
  mutations: {
    INIT_DATA (state) {
      let data = localStorage.getItem("vue-chat-session");
      if (data) {
        state.sessions = JSON.parse(data);
      }
    },
    // 发送消息
    SEND_MESSAGE ({sessions, currentSessionId},id,name,content) {
      let session = sessions.find(item => item.user.id === currentSessionId);
      session.messages.push({
        name: name,
        sessionId: id,
        content: content,
        date: new Date(),
        self: true
      });
    },
    // 选择会话
    SELECT_SESSION (state, id) {
      state.currentSessionId = id;
    },
    // 搜索
    SET_FILTER_KEY (state, value) {
      state.filterKey = value;
    },
    GET_USER_NAME (state, value){
      console.log(value);
      state.user.name = value;
    }
  }
});

store.watch(
  (state) => state.sessions,
  (val) => {
    console.log("CHANGE: ", val);
    localStorage.setItem("vue-chat-session", JSON.stringify(val));
  },
  {
    deep: true
  }
);

export default store;
export const actions = {
  initData: ({dispatch}) => dispatch("INIT_DATA"),
  sendMessage: ({dispatch}, id,name,content) => dispatch("SEND_MESSAGE", id,name,content),
  selectSession: ({dispatch}, id) => dispatch("SELECT_SESSION", id),
  search: ({dispatch}, value) => dispatch("SET_FILTER_KEY", value),
  getUserName: ({dispatch}, value) => dispatch("GET_USER_NAME", value)
};
