const mongoose = require('mongoose');
const bluebird = require('bluebird');
const dbUrl = require('../config/db').url;

// 连接mongodb
mongoose.Promise = bluebird;
mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});


const record = new mongoose.Schema({
  username: String,
  sessionId: String,
  msg: String,
  time: String,
});

const RecordModel = mongoose.model('record', record);

/**
 * 添加一条聊天记录
 *
 * @param {string} username
 * @param {string} sessionId
 * @param {string} msg
 * @param {string} time
 */
function addRecord(username, sessionId, msg, time) {
  if (username || msg || sessionId || time) {
    return false;
  }
  let oneRecord = new RecordModel({
    username,
    sessionId,
    msg,
    time,
  });

  oneRecord.save((err) => {
    if (err) {
      console.log(err);
    }
  });

  return true;
}

module.exports = {
  addRecord,
};
