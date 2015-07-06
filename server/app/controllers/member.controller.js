'use strict';
var Member      = require('../models/member.model');
var debug       = require('debug')('server:controller:member');
var nodemailer  = require('nodemailer');
var config      = require('../../../config/environment');
var transporter = nodemailer.createTransport(config.nodemailer);

module.exports = {
  
  sendResetPassword: function(req, res, next) {
    var email = req.body.email;
    var message;

    // TODO: 가입된 이메일인지 확인 할때 필드를 하나 더 넣어서 검증이 필요하다. 
    // 추가 필드가 없다면, 악의적으로 누군가가 패스워드를 리셋할수도 있다. 
    if( !email ){
      message = "메일이 입력되지 않았습니다."
      req.react = {
        component : 'Home',
        props: {
          path: 'sendResetPasswordForm',
          message: message
        }
      }
      next();
      return;
    }

    // 인증링크 생성
    transporter.sendMail({
      from: 'miconblog@gmail.com',
      to: email,
      subject: '[DevCafe] 비밀번호 재설정 메일입니다.',
      text: '아래의 인증 코드를 클릭해주세요[인증코드]'
    });

    req.message = "입력하신 "+ email +" 로\n인증 메일을 전송했습니다. 메일함을 확인해주세요.";
    next();
  },
  
  singin: function(req, res, next) {

    var email = req.body.email;
    var password = req.body.password;

    Member.find({
      where: {email: email}
    }).then(function (user) {

      // 일치된 사용자가 없다면 user는 null을 반환한다.
      if(user && user.authenticate(password) ) {
        
        var data = user.get({plain:true});
        delete data.hashedPassword;
        delete data.salt;


        // 세션에서 redirect를 받아서 처리하자!
        var url = req.session.redirect || "/";
        req.session.user = data;
        
        // NOTICE: REDIS 스토어는 save 없어도 자동 저장되지만 다른 스토어는 save가 있어야 저장되므로 컨벤션에 맞춤
        req.session.save();        

        /**
         * session에  redirect url이 있으면 로그인 완료 후 해당 url로 redirect 한다.
         * */
        if(req.session.redirect){
          var redirect = req.session.redirect;
          delete req.session.redirect;
          return res.redirect(redirect);
        }

        if(req.session.user.shouldResetPassword) {
          return res.redirect("/account/resetPassword");
        }

        return res.redirect("/");

      } else { 

        req.react = {
          component : 'Home',
          props: {
            path : 'home',
            auth : false,
            message: '패스워드가 일치하지 않습니다.'
          }
        }
        next();
      }

    });

  },

  changePassword: function(req, res){

    var id = req.session.user.id;
    var newPassword = req.body.password;

    debug("changePassword memberId:%s, newpass:%s", id, newPassword);

    // 앞에서 세션을 인증하고 넘어오기 때문에 멤버는 항상 있을수밖에 없다. 
    Member.findOne({where:{id:id}}).then(function(member){

      member.password = newPassword;
      member.shouldResetPassword = false;
      member.save().then(function(){
      
        res.json({result:'OK'});  

      });

    });

  },

  changeInfo: function(req, res){

    var id = req.session.user.id;
    var newName = req.body.name;
    var newEmail = req.body.email;

    debug("changeInfo newName:%s, newEmail:%s", newName, newEmail);

    // 앞에서 세션을 인증하고 넘어오기 때문에 멤버는 항상 있을수밖에 없다.
    Member.findOne({where:{id:id}}).then(function(member){

      member.name = newName;
      member.email = newEmail;
      member.save().then(function(){
        var user = member.get({plain:true});
        delete user.hashedPassword;
        delete user.salt;
        req.session.user = user;

        res.json({result:'OK'});

      });

    });

  },

  /**
   * 1. 회원가입시 폼정보가 제대로 들어왔는지 검사한다.
   */
  validate: function(req, res, next) {

    console.log("1. validateForm > BODY", req.body);

    var emailName = req.body.emailName;
    var emailDomain = req.body.emailDomain;
    var splits = req.body.company.split(':'), companyId=null;


    if( splits.length > 1 ){
      emailDomain = splits[0]
      companyId = splits[1];
    }

    // 이메일 검증. 실패시 바로 response 보내고 리턴
    var email = emailName + '@' + emailDomain;
    var isValid = (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(email);
    

    if( !isValid ){      
      req.error = {
        email: email,
        message: "이메일 주소가 잘못되었습니다. 올바른 메일 주소를 넣어주세요."
      }
      return next();
    }
  

    req.body = {
      email : email,
      emailDomain : emailDomain,
      username : emailName, 
      companyId: companyId
    }

    next();
  },

  /**
   * 2. 검증된 이메일로 회원을 생성한다.
   */ 
  create: function(req, res, next) {

    if(req.error){ return next() }

    console.log("2. member.create > BODY", req.error, req.body);

    Member.findOrCreate({
      where: {email: req.body.email},
      defaults: {name: req.body.username, password:'1234', companyId: req.body.companyId}
    })
    .spread(function(user, created){


      if( !created ){
        req.error = {
          message: '이미 가입된 메일주소('+ req.body.email+')입니다.'
        }
      } 

      next();
    })
  }

};

