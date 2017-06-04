import * as api from '../../api';
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
  setTalkingTo({ commit }, value) {
    commit(types.SET_TALKING_TO, value);
  },
  reduceTalkToPeople({ commit }, value) {
    commit(types.REDUCE_TALK_TO_PEOPLE, value);
  },
  addTalkToPeople({ commit }, value) {
    commit(types.ADD_TALK_TO_PEOPLE, value);
  },
};

const mutations = {
  [types.GET_OTHERS_SUCCESS](state, { others }) {
    state.people.splice(0);
    others.map((other) => {
      state.people.push({
        label: other.username,
        value: other.sessionId,
      });
      return true;
    });
  },

  [types.GET_OTHERS_FAILURE](state) {
    state.people = [];
    state.talkingTo = -1;
    state.talkToPeople = [];
  },

  [types.SET_TALKING_TO](state, { value }) {
    state.talkingTo = value;
  },

  [types.REDUCE_TALK_TO_PEOPLE](state, { value }) {
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

  [types.ADD_TALK_TO_PEOPLE](state, { value }) {
    state.talkToPeople.push(value);
  },
};


export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
