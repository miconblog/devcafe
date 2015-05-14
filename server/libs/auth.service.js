module.exports.isAuthenticated = function(req, res, next){

  // 인증되지 않았다면 로그인(signin)인 먼저 하도록 유도한다.  
  // 따라서 로그인 페이지로 넘기되, redirect 옵션을 준다. 
  if( !req.session.user ) {
    return res.redirect('/signin?redirect=' + encodeURIComponent(req.originalUrl));
  }

  next();

}