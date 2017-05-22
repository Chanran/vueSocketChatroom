const express = require('express');
const socketHandler = require('../middlewares/socketHandler');

const router = express.Router();

router.get('/', function* () {
  let sessionId = this.cookies.get('blue');
  let name = this.session.username;
  console.log('session_id', sessionId, 'name', name);
  if (sessionId && name) {
    yield socketHandler.addUser(name, sessionId);
  }
});

/* GET home page. */
router.get('/login', (req, res) => {
  let username = req.query.username || req.params.username;
  let ip = req.connection.remoteAddress;
  let port = req.connection.remotePort;
  let sessionId = req.session.id;

  if (username) {
    req.session.username = username;
    res.cookie('ioUser',
      {
        username,
        ip,
        port,
        sessionId,
      },
      {
        signed: true,
        secure: false,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24)), // cookie保存一天时间
        httpOnly: true,
      });

    res.json({
      msg: 'success',
      code: '200',
    });
  } else {
    res.json({
      msg: 'username is required',
      code: '201',
    });
  }
});

router.get('/logout', (req, res) => {
  if (req.session.username) {
    req.session.username = null;
    res.json({
      code: '200',
      msg: 'log out successfully',
    });
  } else {
    res.json({
      code: '203',
      msg: 'log out error,you are not logged in',
    });
  }
});

router.get('/testLogin', (req, res) => {
  if (req.session.username) {
    res.json({
      msg: 'logged in',
      code: '200',
    });
  } else {
    res.json({
      msg: 'not log in',
      code: '203',
    });
  }
});

module.exports = router;
