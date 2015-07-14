var debug       = require('debug')('server:controller:mail');
var nodemailer  = require('nodemailer');
var config      = require('../../../config/environment');
var transporter = nodemailer.createTransport(config.nodemailer);

module.exports = {
  send : function(req, res, next){
    if( req.error ){ return next() }

    var email = req.body.email;
    var authLink = ['http://',config.host,':',config.port,'/confirm?code=', req.authcode, '&email=', email].join('');
    
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
  },

  resetPassword : function(req, res, next){

    var email = req.body.email;
    var authLink = ['http://',config.host,':',config.port,'/confirm?code=', req.authcode, '&email=', email].join('');
    
    console.log("AUTH LINK: ", authLink, req.error);

    if( !req.error ){

      transporter.sendMail({
        from: 'miconblog@gmail.com',
        to: req.body.email,
        subject: '[DevCafe] 비밀번호 재설정 메일입니다.',
        html: '이 [<a href="' + authLink + '">인증링크</a>]를 클릭해서 비밀번호를 재설정합니다.'
      }, function(error, info){
        if(error){
            return console.log(error);
        }

        console.log('Message sent: ' + info.response);
      });

    }

    req.message = "입력하신 "+ email +" 로\n인증 메일을 전송했습니다. 메일함을 확인해주세요.";
    next();
  }

}