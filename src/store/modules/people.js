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
        commit(types.GET_OTHERS_FAILURE, err);
        // 关闭loading
        commit(types.END_LOADING);
      });
  },
};

const mutations = {
  [types.GET_OTHERS_SUCCESS](state, { data }) {
    console.log(data);
  },

  [types.GET_OTHERS_FAILURE](state) {
    state.people = [];
    state.talkingTo = -1;
    state.talkToPeople = [];
  },
};


export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
