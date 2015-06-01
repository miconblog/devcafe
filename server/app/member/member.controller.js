/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';

var Member = require('./member.model');
var renderReact = require('../../libs/render-react');
var React = require('react');
var Home = React.createFactory(require('../../../flux/components/Home.jsx'));
var UserList = React.createFactory(require('../../../flux/components/UserList.jsx'));
var ResetPwd = React.createFactory(require('../../../flux/components/ResetPwd.jsx'));
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();


/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {

  Member.findAll().then(function (users) {
   
    res.render('user', renderReact(UserList, {
      title: 'Express User',
      path : 'users',
      users: users
    }));

  });
};

exports.resetPassword = function(req, res) {

  console.log("---> ", req.session.user );

  res.render('resetPassword', renderReact(ResetPwd, {
    member : req.session.user
  }));

};

exports.authenticate = function(req, res) {

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

      console.log("REDIRECT>? ", url);

      req.session.isAuthenticated = true;
      req.session.user = data;
      //req.session.save();

        /**
         * session에  redirect url이 있으면 로그인 완료 후 해당 url로 redirect 한다.
         * */
      if(req.session.redirect && req.session.redirect !== null){
        var redirect = req.session.redirect;
        req.session.redirect = null;
        return res.redirect(redirect)
      }
      res.redirect("/");

    } else { 

      res.render('home', renderReact(Home, {
        title: 'Express authenticate Fail!',
        path : 'signin',
        auth : false,
        message: '패스워드가 일치하지 않습니다.'
      }));
    }

  });

};


exports.create = function(req, res) {

  var email = req.body.email;
  var message = '등록된 이메일로 가입확인 메일을 보냈습니다.'

  // 이메일 검증. 실패시 바로 response 보내고 리턴
  var isValid = (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(email);
  if( !isValid ){
    message = "이메일 주소가 잘못되었습니다. 올바른 메일 주소를 넣어주세요.";
    res.render('home', renderReact(Home, {
      title: '회원가입',
      path: 'signup',
      message: message,
      email:email
    }));
    return;
  }

  User.findOrCreate({
    where: {email: email}, 
    defaults: {name: 'test', password:'1234'}
  })
  .spread(function(user, created){

    if( !created ){
      message = '이미 가입된 메일주소('+ user.email+')입니다.'
    } else {
      message = '등록된 이메일('+ user.email+')로 가입확인 메일을 보냈습니다.'


      // 인증링크 생성
      transporter.sendMail({
        from: 'miconblog@gmail.com',
        to: user.email,
        subject: '[DevCafe] 가입을 환영합니다.',
        text: '안녕? 가입을 축하해. 하지만 아래 인증 링크를 눌러야 가입이 완료된다!! 하지만 일단 테스용 비밀번호는 1234 야! '
      });

    }

    res.render('home', renderReact(Home, {
      title: '회원가입',
      path: 'signup',
      message: message
    }));

  });

  
};

