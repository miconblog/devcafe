'use strict';
require('./libs/database/relations')();

var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger  = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var exphbs = require('express-handlebars');
var config = require('../config/environment');
var app = express();

// moment locale 설정
var moment = require('moment');
moment.locale('ko');

// for complie .jsx
var JSX = require('node-jsx').install({extension: '.jsx', harmony: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
  extname: '.hbs',
  partialsDir: ['./server/views/partials']
}));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 
  secret: 'devcafe', 
  store : new RedisStore({ ttl: 30 * 60 * 60}), // HACK: 테스트를 위해 세션을 30분에서 30시간으로 늘렸다. Redis 스토어가 너무 금방 차면 세션을 시간을 다시 줄여야한다. 
  saveUninitialized: false,
  resave: false
}));
app.use(express.static( path.resolve(__dirname, '../public') ));
app.use(require('./libs/middleware/1_req_session'));
app.use(require('./libs/middleware/2_res_locals'));
app.use(require('./libs/middleware/3_xss_filter'));

// 라우터 처리
require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      status: err.status,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
