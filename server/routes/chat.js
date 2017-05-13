const express = require('express');
// const crypto = require('crypto');

const router = express.Router();

/* GET home page. */
router.get('/login', (req, res) => {
  let username = req.query.username || req.params.username;
  let ip = req.connection.remoteAddress;
  let port = req.connection.remotePort;

  res.cookie('ioUser',
    {
      username,
      ip,
      port,
    },
    {
      secure: false,
      expires: new Date(Date.now() + (1000 * 60 * 60 * 24)), // cookie保存一天时间
      httpOnly: true,
    });
  res.json({
    msg: 'success',
    code: '200',
  });
});

module.exports = router;
