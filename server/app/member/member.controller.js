/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';

var Member = require('./member.model');
var AuthCode = require('../../app/authcode/authcode.model');
var moment = require('moment');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
var renderReact = require('../../libs/render-react');
var debug = require('debug')('server:controller:member');

module.exports = {
  
  resetPassword: function(req, res, next) {

    req.react = {
      component : 'ResetPass',
      props: {
        member : req.session.user
      }
    }
    next();

  },
  
  sendResetPasswordPost: function(req, res, next) {
    var email = req.body.email;
    var message;

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

    req.react = {
      component : 'Home',
      props: {
        path: 'sendResetPasswordFormSuccess',
        email : email
      }
    }
    next();
  },

  sendResetPasswordForm: function(req, res, next) {

    // 로그인 되어 있다면 홈으로 보내라!
    if( req.session.user ) {
      return res.redirect('/');
    }

    req.react = {
      component : 'Home',
      props: {
        path: 'sendResetPasswordForm'
      }
    }
    next();

  },

  settings: function(req, res, next) {

    console.log("next is : ", next);
    req.react = {
      component : 'Settings',
      props: {
        member : req.session.user
      }
    }
    next();

  },
  
  authenticate: function(req, res, next) {

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
          return res.redirect("/resetPassword");
        }

        res.redirect("/");

      } else { 

        req.react = {
          component : 'Home',
          props: {
            title: 'Express authenticate Fail!',
            path : 'signin',
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

    var message = '';
    var emailName = req.body.emailName;
    var splits = req.body.company.split(':');
    var emailDomain, companyId=null;

    if( splits ){
      emailDomain = splits[0];
      companyId = splits[1];
    }

    if(req.body.company === '0') { 
      // 프리랜서일 경우 문자열 '0'으로 들어온다.
      // 이메일 검증. 실패시 바로 response 보내고 리턴
      emailDomain = req.body.emailDomain;
      var email = emailName + '@' + emailDomain;
      var isValid = (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(email);
      if( !isValid ){
        message = "이메일 주소가 잘못되었습니다. 올바른 메일 주소를 넣어주세요.";
      }
          } 

    req.body = {
      email : emailName + '@' + emailDomain,
      emailDomain : emailDomain,
      username : emailName, 
      companyId: companyId,
      message: message
    }

    next();
  },

  /**
   * 2. 회원가입시 인증 코드를 생성한다.
   */ 
  makeAuthCode: function(req, res, next) {

    console.log("2. makeAuthCode > BODY", req.body);
    req.body.authcode = crypto.createHash('md5').update(moment().format()).digest('hex');

    AuthCode
    .findOrCreate({ 
      where: {email: req.body.email}, 
      defaults: {
        email: req.body.email, 
        code: req.body.authcode,
        created_at: moment(),
        expired_at: moment().add(2, 'days')
      }
    })
    .spread(function(code, created) {

      if( !created ) {
        code.code = req.body.authcode;
        code.created_at = moment();
        code.expired_at = moment().add(2, 'days');;
        code.save()
      }

      next();
    });
  },

  /**
   * 3. 검증된 이메일로 회원을 생성한다.
   */ 
  create: function(req, res, next) {
    console.log("3. member.create > BODY", req.body);

    if( req.body.message ){
      req.react = {
        component : 'Home',
        props: {
          title: '회원가입',
          path: 'signup',
          message: req.body.message,
          email: req.body.email,
          emailDomain: req.body.emailDomain,
          companyId: req.body.companyId
        }
      }
      next();
      return;
    }


    Member.findOrCreate({
      where: {email: req.body.email},
      defaults: {name: req.body.username, password:'1234', companyId: req.body.companyId}
    })
    .spread(function(user, created){

      var message = '등록된 이메일('+ req.body.email+')로 가입확인 메일을 보냈습니다.';
      var authLink = ['http://localhost:9000', '/confirm?code=', req.body.authcode, '&email=', req.body.email].join('');

      if( !created ){
        message = '이미 가입된 메일주소('+ req.body.email+')입니다.'
      } else {
        
        // 인증링크 생성
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

      }

      req.react = {
        component : 'Home',
        props: {
          title: '회원가입',
          path: 'signup',
          message: message,
          companys: []
        }
      }
      next();

    })
  }
};

