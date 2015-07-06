var debug       = require('debug')('server:controller:mail');
var nodemailer  = require('nodemailer');
var config      = require('../../../config/environment');
var transporter = nodemailer.createTransport(config.nodemailer);

module.exports = {
  send : function(req, res, next){
    if( req.error ){ return next() }

    var authLink = ['http://',config.host,':',config.port,'/confirm?code=', req.authcode, '&email=', req.body.email].join('');
    
    console.log("AUTH LINK: ", authLink);

    transporter.sendMail({
      from: 'miconblog@gmail.com',
      to: req.body.email,
      subject: '[DevCafe] 가입을 환영합니다.',
      html: '개발자들의 위한 커뮤니티! DevCafe에 오신걸 환영합니다. <a href="' + authLink + '">인증링크</a>를 클릭해서 가입을 완료하세요.'
    }, function(error, info){
      if(error){
          return console.log(error);
      }

      console.log('Message sent: ' + info.response);
    });

    req.message = '등록된 이메일('+ req.body.email+')로\n가입확인 메일을 보냈습니다.';
    req.completeSignUp = true;
    next();
  }	
}