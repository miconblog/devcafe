/**
 * 세션에 정보를 저장하는 미들웨어
 */
'use strict';
var _ = require('lodash');
var debug = require('debug')('mw:SESSION');

module.exports = function(req, res, next){

  debug("\n", req.session);
  
  //debug("SESSION ID: %s", JSON.stringify(req.session));
  //delete req.session.test;

  // if( req.session.resetPassword && req.session.user ) {
  //   delete req.session.resetPassword;
  //   return res.redirect("/resetPassword");
  // }

  // 로그인 했으면
  
  next();

  // if( req.path === '/resetPassword' ){
 
  //   next();
 
  // }else{

  //    // 인증코드를 통과했다면
  //   if( req.session.isVerified ){

  //     res.locals.user = req.session.user;
  //     return res.redirect('/resetPassword');

  //   }


  //   if( req.session.user && req.session.user.shouldResetPassword ) {
  //     return res.redirect('/resetPassword');
  //   }

  //   next();
  // }

 
}