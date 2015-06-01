/**
 * 세션에 회원정보가 있는지 확인해서 locals에 넣는다.
 */

'use strict';

module.exports = function(req, res, next){
  
  console.log("\n\nSESSION ID: ", req.session)
  //delete req.session.test;

  // if( req.session.resetPassword && req.session.user ) {
  //   delete req.session.resetPassword;
  //   return res.redirect("/resetPassword");
  // }

  // 로그인 했으면
  if( req.session.isAuthenticated || req.session.user) {
    res.locals.user = req.session.user;
  
  }

  // 인증코드를 통과했다면
  if( req.session.isVerified && req.path !== '/resetPassword'){

    res.locals.user = req.session.user;
    return res.redirect('/resetPassword');

  }


  next();
}