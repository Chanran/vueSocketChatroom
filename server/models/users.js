/*
 * 内部数据结构：用户列表
 *  [{name, sessionId, socket} ...]
 * */
let users = [];

function findInUsers(sessionId) { // 通过sessionId查找
  let index = -1;
  for (let j = 0, len = users.length; j < len; j += 1) {
    if (users[j].sessionId === sessionId) { index = j; }
  }
  return index;
}
function addUser(name, sessionId) { // 添加用户
  let index = findInUsers(sessionId);
  if (index === -1) {
    users.push({
      name,
      sessionId,
      socket: null,
    });
  } else if (users[index].name !== name) {
    users[index].name = name;
  }
}
function setUserSocket(sessionId, socket) { // 更新用户socket
  let index = findInUsers(sessionId);
  if (index !== -1) {
    users[index].socket = socket;
  }
}
function findUser(sessionId) { // 查找
  let index = findInUsers(sessionId);
  return index > -1 ? users[index] : null;
}
function otherUsers(sessionId) { // 其他人
  let results = [];
  for (let j = 0, len = users.length; j < len; j += 1) {
    if (users[j].sessionId !== sessionId) {
      results.push({
        sessionId: users[j].sessionId,
        name: users[j].name,
      });
    }
  }
  return results;
}

module.exports = {
  findUser,
  otherUsers,
  addUser,
  setUserSocket,
};
