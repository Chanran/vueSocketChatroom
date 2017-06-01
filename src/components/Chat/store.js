/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
function deepClone (obj) {
  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  } else if (obj && typeof obj === "object") {
    var cloned = {};
    var keys = Object.keys(obj);
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      cloned[key] = deepClone(obj[key]);
    }
    return cloned;
  } else {
    return obj;
  }
}
const saveToLSMiddleware = {
  onInit (state) {
    //存储初始聊天界面
    localStorage.setItem("vue-chat",JSON.stringify(state));
  },
  snapshot: true,
  onMutation (mutation, nextState,prevState) {
    if(mutation.type==="SEND_MESSAGE"){
      localStorage.setItem("vue-chat-"+nextState.user.name,JSON.stringify(nextState));
    }
    if(mutation.type==="INIT_DATA"){

    }
  }
};
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
        user: {
          name: "群聊",
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
        user: {
          name: "Geekaholic",
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
        user: {
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
    filterKey: "",
  },
  mutations: {

    INIT_DATA (state, user) {
      let data = localStorage.getItem("vue-chat-"+user.name);
      let temp = {};
      //如果在local存在则赋值
      if (data) {
        temp = JSON.parse(localStorage.getItem("vue-chat-"+user.name));
      } else {
        //初始状态且没有数据时
        temp = JSON.parse(localStorage.getItem("vue-chat"));
      }
      Vue.set(state, 'user', user);
      Vue.set(state,'sessions',temp.sessions);
    },
    // 发送消息
    SEND_MESSAGE ({sessions, currentSessionId}, id, name, content) {
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
    GET_USER_NAME (state, user){
      Vue.set(state, 'user', user);
    }
  },
  middlewares:[saveToLSMiddleware]
});


export default store;
export const actions = {
  initData: ({dispatch}, userName) => dispatch("INIT_DATA", userName),
  sendMessage: ({dispatch}, id, name, content) => dispatch("SEND_MESSAGE", id, name, content),
  selectSession: ({dispatch}, id) => dispatch("SELECT_SESSION", id),
  search: ({dispatch}, value) => dispatch("SET_FILTER_KEY", value),
  getUserName: ({dispatch}, value) => dispatch("GET_USER_NAME", value)
};
