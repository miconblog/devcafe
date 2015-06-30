/**
 * Service 는 항상 미들웨어를 반환한다.
 * Auth 객체는 인증과 관련된 기능을 관리한다.   
 */

'use strict';
var Company  = require('../../app/company/company.model');
var debug = require('debug')('auth.service');

var authService = {

  isAuthenticated : function(){

    // 인증되지 않았다면 로그인(signin)인 먼저 하도록 유도한다.  
    // 따라서 로그인 페이지로 넘기되, redirect 옵션을 준다.   
    return function(req, res, next){

      if( !req.session.user ) {
        /**
         * session에  redirect url을 저장해둔다.
         * */
        req.session.redirect = req.originalUrl;
        return res.redirect('/');
      }

      next();

    }
  },

  isVerified : function(){

    // 회원가입후 이메일 인증이 됐는지 확인하고, 
    // 인증되지 않았다면 
    return function(req, res, next){
  
      //console.log("\n\nSESSION ID: ", req.session)
      //delete req.session.test;

      // if( req.session.resetPassword && req.session.user ) {
      //   delete req.session.resetPassword;
      //   return res.redirect("/resetPassword");
      // }

      // 로그인 했으면
      if( req.session.user) {
        res.locals.user = req.session.user;
      
      }

      // 인증코드를 통과했다면
      if( req.session.isVerified && req.path !== '/resetPassword'){

        res.locals.user = req.session.user;
        return res.redirect('/resetPassword');

      }


      next();
    }
  },

  hasRole : function(type){

    return function(req, res, next){

      if( req.session.user.role === type ) {

        next();  
      
      } else {
        var err = new Error('접근할 권한이 없습니다. 당신은 현재 ' + type + '권한입니다.');
        err.status = 401;
        next(err);   
      }
      
    }
  }

}



module.exports = authService;