'use strict';
var Member      = require('../models/member.model');
var debug       = require('debug')('server:controller:member');

module.exports = {
    
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

  isExist: function(req, res, next){

    Member
    .count({where:{email:req.body.email}})
    .then(function(count){

      if(count === 0){
        req.error = {
          message: "없는 유저니까 인증메일을 보내지는마!, 하지만 보내는척은 해라!"
        }
      }
      next();
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

