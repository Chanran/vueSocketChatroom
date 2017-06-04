import * as api from '../../api/api';
import * as types from '../mutation-types';

const initialState = {
  people: [],
  talkingTo: -1,
  talkToPeople: [],
};

const getters = {
  people: state => state.people,
  talkingTo: state => state.talkingTo,
  talkToPeople: state => state.talkToPeople,
};

const actions = {
  // 得到其他人列表
  getOthers({ commit }) {
    // 开始异步请求，展示loading动画
    commit(types.START_LOADING);
    api.getOthers(
      (data) => {
        commit(types.GET_OTHERS_SUCCESS, data);
        // 关闭loading
        commit(types.END_LOADING);
      },
      (err) => {
        console.log(err);
        commit(types.GET_OTHERS_FAILURE);
        // 关闭loading
        commit(types.END_LOADING);
      });
  },
  // 有人进入了房间
  addPeople({ commit }, user) {
    commit(types.ADD_PEOPLE, user);
  },
  // 设置talkingTo
  setTalkingTo({ commit }, value) {
    commit(types.SET_TALKING_TO, value);
  },
  // 移出某个talkToPeople
  reduceTalkToPeople({ commit }, value) {
    commit(types.REDUCE_TALK_TO_PEOPLE, value);
  },
  // 增加某个talkToPeople
  addTalkToPeople({ commit }, index) {
    commit(types.ADD_TALK_TO_PEOPLE, index);
  },
};

const mutations = {
  // 成功得到其他人列表
  [types.GET_OTHERS_SUCCESS](state, others) {
    if (others.length > 0) {
      state.people.splice(0);
      others.map((other) => {
        state.people.push({
          label: other.username,
          value: other.sessionId,
        });
        return true;
      });
    }
  },
  // 得到其他人列表失败
  [types.GET_OTHERS_FAILURE](state) {
    state.people = [];
    state.talkingTo = -1;
    state.talkToPeople = [];
  },
  // 设置正在聊天的人
  [types.SET_TALKING_TO](state, value) {
    state.talkingTo = value;
  },
  // 关闭某个聊天室
  [types.REDUCE_TALK_TO_PEOPLE](state, value) {
    let index = null;
    for (let i = 0; i < state.talkToPeople.length; i += 1) {
      if (state.talkToPeople[i] === value) {
        index = i;
      }
    }
    if (index !== null) {
      state.talkToPeople.splice(index, 1);
    }
  },
  // 增加一个私聊聊天室
  [types.ADD_TALK_TO_PEOPLE](state, index) {
    state.talkToPeople.push(index);
  },
  // 增加一个聊天室的用户
  [types.ADD_PEOPLE](state, user) {
    state.people.push(user);
  },

};


export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
