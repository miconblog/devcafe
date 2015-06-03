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
var ResetPass = React.createFactory(require('../../../flux/components/ResetPass.jsx'));
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
var debug = require('debug')('member.controller');


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

  res.render('resetPassword', renderReact(ResetPass, {
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

      res.render('home', renderReact(Home, {
        title: 'Express authenticate Fail!',
        path : 'signin',
        auth : false,
        message: '패스워드가 일치하지 않습니다.'
      }));
    }

  });

};

exports.changePassword = function(req, res){


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

