let io = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');
const users = require('../models/users');
const cookieParser = require('cookie-parser');
const urlencode = require('urlencode');
const moment = require('moment');

const secret = fs.readFileSync(path.resolve(__dirname, '../config/secret.key'), 'utf8');

function getSessionId(cookieString, cookieName) {
  // console.log(cookieString);
  let matches = new RegExp(`${cookieName}=([^;]+)`, 'gmi').exec(cookieString);
  // console.log(matches);
  return matches ? matches[1] : null;
}

function messageHandler(socketio) {
  socketio.on('connection', (socket) => {
    console.log(socket.id, '已连接');
    let cookies = socket.request.headers.cookie;
    let sessionId = null;

    socket.on('login', () => {
      let unsignedCookie = urlencode.decode(getSessionId(cookies, 'iouser'));
      sessionId = cookieParser.signedCookie(unsignedCookie, secret);
      let time = moment().format('YYYY/MM/DD HH:mm:ss');
      if (sessionId) {
        // 设置登录的用户的socket
        users.setUserSocket(sessionId, socket);
        let username = users.getUsername(sessionId);
        // console.log(username);

        // 广播通知有用户进入聊天室
        socket.broadcast.emit('someOneLogin', {
          user: {
            username,
            sessionId,
          },
          msg: `${username} 进入了房间`,
          time,
        });
      }
    });

    // 广播
    socket.on('broadcast', (data) => {
      let username = users.getUsername(sessionId);
      let msg = data.msg;
      let time = moment().format('YYYY/MM/DD HH:mm:ss');
      if (username) {
        socket.broadcast.emit('broadcast', {
          user: {
            sessionId,
            username,
          },
          msg,
          time,
        });
      }
    });

    // 私聊
    socket.on('private', (data) => {
      let username = users.getUsername(sessionId);
      let time = moment().format('YYYY/MM/DD HH:mm:ss');
      if (username) {
        let to = users.findUser(data.toSessionId);
        if (to) {
          to.socket.emit('private', {
            user: {
              sessionId,
              username,
            },
            msg: data.msg,
            time,
          });
        }
      }
    });

    socket.on('disconnect', () => {
      let username = users.getUsername(sessionId);
      console.log(username, '已退出聊天室');
      let time = moment().format('YYYY/MM/DD HH:mm:ss');
      socket.broadcast.emit('quit', {
        user: {
          sessionId,
          username,
        },
        msg: `${username} 退出了聊天室`,
        time,
      });
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
