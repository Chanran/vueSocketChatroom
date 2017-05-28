let io = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');
const users = require('../models/users');
const cookieParser = require('cookie-parser');
const urlencode = require('urlencode');

const secret = fs.readFileSync(path.resolve(__dirname, '../config/secret.key'), 'utf8');

function getSessionId(cookieString, cookieName) {
  // console.log(cookieString);
  let matches = new RegExp(`${cookieName}=([^;]+);`, 'gmi').exec(cookieString);
  // console.log(matches);
  return matches[1] ? matches[1] : null;
}

function messageHandler(socketio) {
  socketio.on('connection', (socket) => {
    console.log(socket.id, '已连接');
    let cookies = socket.request.headers.cookie;
    let sessionId = null;

    socket.on('login', () => {
      let unsignedCookie = urlencode.decode(getSessionId(cookies, 'ioUser'));
      sessionId = cookieParser.signedCookie(unsignedCookie, secret);
      // 设置登录的用户的socket
      users.setUserSocket(sessionId, socket);
      let username = users.getUsername(sessionId);
      console.log(username);

      // 广播通知有用户进入聊天室
      socket.broadcast.emit('someOneLogin', {
        user: {
          username,
          sessionId,
        },
        msg: `${username} 进入了房间`,
      });
    });

    // 广播
    socket.on('broadcast', (data) => {
      let username = users.getUsername(sessionId);
      let msg = data.msg;
      console.log(username);
      console.log(msg);
      if (username) {
        socket.broadcast.emit('broadcast', {
          username,
          msg,
        });
      }
    });

    // 私聊
    socket.on('private', (data) => {
      console.log(data);
      let username = users.getUsername(sessionId);
      if (username) {
        let to = users.findUser(data.toSessionId);
        if (to) {
          to.socket.emit('private', {
            username,
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
