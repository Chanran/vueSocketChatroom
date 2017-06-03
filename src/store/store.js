import Vue from 'vue';
import Vuex from 'vuex';

import types from './mutation-types';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

/* 全局 */

const initialState = {
  isLoading: false,
};

const getters = {
  loading: state => state.isLoading,
};

const actions = {
  startLoading({ commit }) {
    commit(types.START_LOADING);
  },
  endLoading({ commit }) {
    commit(types.END_LOADING);
  },
};

const mutations = {
  [types.START_LOADING](state) {
    state.isLoading = true;
  },

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

  },
  strict: debug,
});
