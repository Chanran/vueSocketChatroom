import * as api from '../../api/api';
import * as types from '../mutation-types';

const initialState = {
  records: [],
};

const getters = {
  records: state => state.records,
};

const actions = {
  // 得到聊天记录
  getRecords({ commit }) {
    commit(types.START_LOADING);
    api.getRecords(
      (data) => {
        commit(types.GET_RECORDS_SUCCESS, data);
        // 关闭loading
        commit(types.END_LOADING);
      },
      (err) => {
        console.log(err);
        commit(types.GET_RECORDS_FAILURE);
        // 关闭loading
        commit(types.END_LOADING);
      });
  },
  addRecord({ commit }, record) {
    commit(types.ADD_RECORD, record);
  },
};

const mutations = {
  [types.GET_RECORDS_SUCCESS](state, records) {
    if (records.length > 0) {
      state.records.splice(0);
      records.map((record) => {
        state.records.push(record);
        return true;
      });
    }
  },
  [types.GET_RECORDS_FAILURE](state) {
    state.records = [];
  },
  [types.ADD_RECORD](state, record) {
    state.records.push(record);
  },
};


export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
