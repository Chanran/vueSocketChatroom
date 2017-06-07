import * as api from '../../api/api';
import * as types from '../mutation-types';

const initialState = {
  records: [], // [{sessionId,username,msg,time}...]
  // sessionId是发出来的人的sessionId
  privateGroups: [], // [{sessionId,username,msgs:[{sessionId,username,msg,time}]}]
};

const getters = {
  records: state => state.records,
  privateGroups: state => state.privateGroups,
};

const actions = {
  // 得到群聊聊天记录
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
  // 增加一条群聊聊天记录
  addRecord({ commit }, record) {
    commit(types.ADD_RECORD, record);
  },
  // 增加一个私聊窗口
  addPrivateGroup({ commit }, privateGroup) {
    commit(types.ADD_PRIVATE_GROUP, privateGroup);
  },
  // 增加一条私聊聊天记录
  addPrivateRecord({ commit }, privateRecord) {
    console.log(privateRecord);
    commit(types.ADD_PRIVATE_RECORD, privateRecord);
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
  [types.ADD_PRIVATE_GROUP](state, privateGroup) {
    state.privateGroups.push(privateGroup);
  },
  [types.ADD_PRIVATE_RECORD](state, privateRecord) {
    let groupIndex = privateRecord.privateGroupIndex;
    let privateGroupRecord = {
      sessionId: privateRecord.sessionId,
      username: privateRecord.username,
      msg: privateRecord.msg,
      time: privateRecord.time,
    };
    state.privateGroups[groupIndex].msgs.push(privateGroupRecord);
  },
};


export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
