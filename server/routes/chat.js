const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/login', (req, res) => {
  console.log(req.connection.remoteAddress);
  res.cookie('test', 'xxx');
  res.json({});
});

module.exports = router;
