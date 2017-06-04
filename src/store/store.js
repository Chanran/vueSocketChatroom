import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';
import people from './modules/people';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

/* 全局 */

// 全局可用的state
const initialState = {
  isLoading: false,
  menu: false,
};

// 全局可用的getters
const getters = {
  loading: state => state.isLoading,
};

// 全局可用的actions
const actions = {
  // 开始loading
  startLoading({ commit }) {
    commit(types.START_LOADING);
  },
  // 结束loading
  endLoading({ commit }) {
    commit(types.END_LOADING);
  },
};

// 全局可用的mutations
const mutations = {
  // 开始loading
  [types.START_LOADING](state) {
    state.isLoading = true;
  },
  // 结束loading
  [types.END_LOADING](state) {
    state.isLoading = false;
  },
};


export default new Vuex.Store({
  state: initialState,
  getters,
  actions,
  mutations,
  modules: {
    people,
  },
  strict: debug,
});
