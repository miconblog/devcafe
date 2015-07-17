/**
 * 세션에 있는 정보를 뽑아서 템플릿에 쓸 테이터를 만드는 미들웨어
 */
'use strict';
var debug = require('debug')('mw:LOCALS');
var config = require('../../../config/environment');

/**
 * 템플릿에 필요한 locals 변수 설정
 */
module.exports = function(req, res, next){

  debug("\n", res.locals);
  var env = process.env.NODE_ENV;

  if( req.session.user ) {
    res.locals.user = req.session.user;

    if( req.session.user.role === 'admin') {
      res.locals.isAdmin = true;
    }
  
  }

  // 사이트 모드에 따라 서로 다른 Goolge analytics 삽입 
 if( 'production' === env ) {
    res.locals.isRealSite = true;
    res.locals.GA_KEY = config.GA_KEY
  }else{
    res.locals.isLocalSite = true;
  }

  next();  
}