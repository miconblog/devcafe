/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/latest/docs/models-usage/
 */

'use strict';

var User = require('./user.model');
var renderReact = require('../../libs/render-react');
var React = require('react'),
    Home = React.createFactory(require('../../../flux/components/Home.jsx')),
    UserList = React.createFactory(require('../../../flux/components/UserList.jsx'));

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();


/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {


  User.find({
    where: {id: 1},
    //attributes: ['id', 'username', 'email']
  }).then(function (user) {

    // 패스워드 변경 예제
    console.log(" authenticate:  ", user.authenticate('1234'))
    if(user.authenticate('1234')) {
      user.password = '1111';
      user.save().then(function(user) {

        console.log(user.get({plain:true}))
        
      });
    } 

  });


  User.findAll().then(function (users) {
   
    res.render('user', renderReact(UserList, {
      title: 'Express User',
      path : 'users',
      users: users
    }));

  });
};

exports.authenticate = function(req, res) {

  var email = req.body.email;
  var password = req.body.password;

  User.find({
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

