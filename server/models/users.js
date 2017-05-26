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

/*
 * 内部数据结构：用户列表
 *  {username, sessionId, socket}
 * */
const socketUser = new mongoose.Schema({
  username: String,
  sessionId: String,
  socket: Object,
});
const UserModel = mongoose.model('users', socketUser);

/**
 * 返回在线人数
 *
 * @returns number
 */
function getUsersLength() {
  return new Promise((resolve, reject) => {
    UserModel.count({
      $not: [{ username: null }],
    }, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

/**
 * 全部用户信息
 *
 * @returns array
 */
function getUsers() {
  return new Promise((resolve, reject) => {
    UserModel.find({
      $not: [{ username: null }],
    })
    .toArray((err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

/**
 * 根据sessionId找到用户
 *
 * @param {string} sessionId
 * @returns object
 */
function findUser(sessionId) {
  return new Promise((resolve, reject) => {
    UserModel.find({
      $not: [{ username: null }],
      sessionId,
    }, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

/**
 * 获取其他人信息
 *
 * @param {string} sessionId
 * @returns array
 */
function otherUsers(sessionId) {
  return new Promise((resolve, reject) => {
    UserModel.find({
      $not: [{ sessionId }],
    })
    .toArray((err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

function addUser(username, sessionId) {
  // if (findUser(sessionId)) {
  //   return false;
  // }
  console.log(findUser(sessionId));

  let users = new UserModel({
    username,
    sessionId,
    socket: null,
  });

  users.save((err) => {
    if (err) {
      console.log(err);
    }
  });
}

function setUserSocket(sessionId, socket) {
  UserModel.updateOne({
    sessionId,
  }, {
    $set: {
      socket,
    },
  }, (err) => {
    console.log(err);
  });
}

module.exports = {
  getUsersLength,
  getUsers,
  findUser,
  otherUsers,
  addUser,
  setUserSocket,
};
