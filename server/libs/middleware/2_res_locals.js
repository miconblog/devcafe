/**
 * 세션에 있는 정보를 뽑아서 템플릿에 쓸 테이터를 만드는 미들웨어
 */
'use strict';
var debug = require('debug')('mw:LOCALS');
/**
 * 템플릿에 필요한 locals 변수 설정
 */
module.exports = function(req, res, next){

  debug("\n", res.locals);

  if( req.session.user ) {
    res.locals.user = req.session.user;

    if( req.session.user.role === 'admin') {
      res.locals.isAdmin = true;
    }
  
  }
  next();  
}