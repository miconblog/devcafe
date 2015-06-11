/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';

var Member = require('./member.model');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
var debug = require('debug')('server:controller:member');


exports.resetPassword = function(req, res, next) {

  req.react = {
    component : 'ResetPass',
    props: {
      member : req.session.user
    }
  }
  next();

};

exports.settings = function(req, res, next) {

  console.log("next is : ", next);
  req.react = {
    component : 'Settings',
    props: {
      member : req.session.user
    }
  }
  next();

};


exports.authenticate = function(req, res, next) {

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

exports.changeInfo = function(req, res){


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

};


exports.create = function(req, res, next) {
  var email = req.body.email;
  var username = req.body.name;
  var companyId = req.body.companyId; 
  var message = req.body.message;
  var authcode = req.body.authcode;


  if(message){

    req.react = {
      component : 'Home',
      props: {
        title: '회원가입',
        path: 'signup',
        message: message,
        email:email
      }
    }
    next();
    return;
  }


  /**
   * TODO:
   * authServer.validateForm() 회원가입시 필요한 요청 파라메터가 제대로 들어왔는지 검증한다. 
   * 검증 완료후에는 req.body.company 정보가 생성되고, company가 null 일 경우엔 무소속을 의미한다. 
   * req.body 에 email 정보와 company 정보를 보고 회원가입을 진행한다. 
   * 이메일에서 이름도 뽑아낸다.
   */


  Member.findOrCreate({
    where: {email: email}, 
    defaults: {name: username, password:'1234', companyId: companyId}
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

  });

  
};

