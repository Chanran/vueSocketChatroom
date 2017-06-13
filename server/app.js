const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const fs = require('fs');
// const proxy = require('proxy-middleware');

const dbUrl = require('./config/db').url;

const socketHandler = require('./middlewares/socketHandler');
const chat = require('./routes/chat');

const app = express();
const secret = fs.readFileSync(path.resolve(__dirname, 'config/secret.key'), 'utf8');

// 禁用x-powered-by头
app.disable('x-powered-by');

// 启用session
app.use(session({
  secret,
  name: 'iouser',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // signed: true,
    secure: false,
    expires: new Date(Date.now() + (1000 * 60 * 60 * 24)), // cookie保存一天时间
    httpOnly: true,
  },
  store: new MongoStore({
    url: dbUrl,
  }),
}));
// 解析客户端传来的cookie
app.use(cookieParser(secret));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, '../dist/static')));

// 允许跨域访问
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  if (req.method === 'OPTIONS') res.send(200);/* 让options请求快速返回*/
  else next();
});

// 路由
app.use('/api', chat);
// 上线路由
if (process.env.NODE_ENV !== 'development') {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

const server = socketHandler.createServer(app);

server.listen(3000);

console.log('listening on port', 3000);

