let io = require('socket.io');
const http = require('http');
const users = require('../models/users');

// /**
//  * 查找用户
//  * @param {string} sessionId
//  * @returns {number} index
//  */
// function findInUsers(sessionId) {
//   let index = -1;
//   let usersNum = users.getUsersLength();
//   for (let i = 0; i < usersNum; i += 1) {
//     if (users[i].sessionId === sessionId) {
//       index = i;
//     }
//   }
//   return index;
// }

// /**
//  * 增加用户
//  * @param {string} name
//  * @param {string} sessionId
//  */
// function addUser(name, sessionId) {
//   let index = findInUsers(sessionId);
//   if (index === -1) {
//     users.push({
//       name,
//       sessionId,
//       socket: null,
//     });
//   } else if (users[index].name !== name) {
//     users[index].name = name;
//   }
// }

// /**
//  * 设置用户的socket连接
//  * @param {string} sessionId
//  * @param {object} socket
//  */
// function setUserSocket(sessionId, socket) {
//   let index = findInUsers(sessionId);

//   if (index !== -1) {
//     users[index].socket = socket;
//   }
// }

// /**
//  * 查找用户，返回用户信息
//  * @param {string} sessionId
//  * @returns {object} userObject
//  */
// function findUser(sessionId) {
//   let index = findInUsers(sessionId);

//   let userObject = index > -1 ? users[index] : null;

//   return userObject;
// }

// /**
//  * 返回其他用户信息
//  * @param {any} sessionId
//  * @returns {array} others
//  */
// function otherUsers(sessionId) {
//   let others = users.filter((user) => {
//     let isThisUser = user.sessionId !== sessionId ? 1 : 0;
//     return !!isThisUser;
//   });

//   return others;
// }

function getSessionId(cookieString, cookieName) {
  console.log(cookieString);
  let matches = new RegExp(`${cookieName}=([^;]+);`, 'gmi').exec(cookieString);
  console.log(matches);
  return matches[1] ? matches[1] : null;
}

function messageHandler(socketio) {
  socketio.on('connection', (socket) => {
    console.log(socket.id, '已连接');
    // let sessionId = getSessionId(socket.request.headers.cookie, 'io');
    let sessionId = null;
    if (sessionId) {
      users.setUserSocket(sessionId, socket);
    }

    // 广播
    socket.on('broadcast', (data) => {
      let from = users.findUser(sessionId);
      if (from) {
        socket.broadcast.emit('broadcast', {
          name: from.name,
          msg: data.msg,
        });
      }
    });

    // 私聊
    socket.on('private', (data) => {
      let from = users.findUser(sessionId);
      if (from) {
        let to = users.findUser(data.toSessionId);
        if (to) {
          to.socket.emit('private', {
            name: from.name,
            msg: data.msg,
          });
        }
      }
    });

    socket.on('disconnect', () => {
      console.log(this.id, '断开连接');
    });
  });
}

/**
 * 创建server
 * @param {obejct} app
 * @returns {object} server
 */
function createServer(app) {
  const server = http.createServer(app);
  io = io(server);
  messageHandler(io);
  return server;
}

module.exports = {
  createServer,
};
