/**
 * 세션에 회원정보가 있는지 확인해서 locals에 넣는다.
 */
'use strict';
module.exports = function(req, res, next){
  
  //debug("SESSION ID: %s", JSON.stringify(req.session));
  //delete req.session.test;

  // if( req.session.resetPassword && req.session.user ) {
  //   delete req.session.resetPassword;
  //   return res.redirect("/resetPassword");
  // }

  // 로그인 했으면
  if( req.session.user) {
    res.locals.user = req.session.user;

    if( req.session.user.role === 'admin') {
      res.locals.isAdmin = true;
    }
  
  }
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