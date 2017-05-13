const express = require('express');
const crypto = require('crypto');

const router = express.Router();

/* GET home page. */
router.get('/login', (req, res) => {
  let username = req.query.username || req.params.username;
  // const md5 = crypto.createHash('md5');
  // md5.digest('hex');

  res.cookie('username', username, {
    secure: false,
    expires: new Date(Date.now() + (1000 * 60 * 60 * 24)), // cookie保存一天时间
    httpOnly: true,
  });
  res.json({});
});

module.exports = router;
