let io = require('socket.io');
const http = require('http');
const users = require('../models/users');

function getSessionId(cookieString, cookieName) {
  console.log(cookieString);
  let matches = new RegExp(`${cookieName}=([^;]+);`, 'gmi').exec(cookieString);
  console.log(matches);
  return matches[1] ? matches[1] : null;
}

function messageHandler(socketio) {
  socketio.on('connection', (socket) => {
    console.log(socket.id, '已连接');
    // let sessionId = getSessionId(socket.request.headers.cookie, 'ioUser');
    // console.log(sessionId);
    let sessionId = null;
    if (sessionId) {
      users.setUserSocket(sessionId, socket);
    }

    socket.on('login', (data) => {

    });

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
      console.log(socket.id, '断开连接');
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
