/**
 * Service 는 항상 미들웨어를 반환한다.
 * Auth 객체는 인증과 관련된 기능을 관리한다.   
 */

'use strict';
var Company = require('../app/company/company.model');
var debug = require('debug')('auth.service');

var authService = {

  isAuthenticated : function(){

    // 인증되지 않았다면 로그인(signin)인 먼저 하도록 유도한다.  
    // 따라서 로그인 페이지로 넘기되, redirect 옵션을 준다.   
    return function(req, res, next){

      if( !req.session.user ) {
        /**
         * session에  redirect url을 저장해둔다.
         * */
        req.session.redirect = req.originalUrl;
        return res.redirect('/signin');
      }

      next();

    }
  },

  isVerified : function(){

    // 회원가입후 이메일 인증이 됐는지 확인하고, 
    // 인증되지 않았다면 
    return function(req, res, next){
  
      //console.log("\n\nSESSION ID: ", req.session)
      //delete req.session.test;

      // if( req.session.resetPassword && req.session.user ) {
      //   delete req.session.resetPassword;
      //   return res.redirect("/resetPassword");
      // }

      // 로그인 했으면
      if( req.session.user) {
        res.locals.user = req.session.user;
      
      }

      // 인증코드를 통과했다면
      if( req.session.isVerified && req.path !== '/resetPassword'){

        res.locals.user = req.session.user;
        return res.redirect('/resetPassword');

      }


      next();
    }
  },

  /**
   * 회원가입시 폼정보가 제대로 들어왔는지 검사한다. 
   *  - 컴퍼니 아이디에서 컴퍼너 정보를 뽑아서 req 객체에 추가해놓는다. 
   *  - 이메일 아이디를 req 객체의 이름으로 지정하고, 
   *  - 이메일 아이디와 컴퍼니정보의 도메인을 조합해서 email을 만들어낸다. 
   *  - 프리랜서일 경우 email 형식이 맞는지 점검하고, 
   */
  validateForm: function(){

    return function(req, res, next) {

      var message = '등록된 이메일로 가입확인 메일을 보냈습니다.';
      var userName = req.body.email;
      var companyId = req.body.company;


      if(companyId === '0') { // 프리랜서일 경우 문자열 '0'으로 들어온다.

        // 회사 정보는 없다. 
        // username 에서 진짜 이름을 뽑아낸다. 
        var email = req.body.email;

        // 이메일 검증. 실패시 바로 response 보내고 리턴
        var isValid = (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(email);
        if( !isValid ){
          message = "이메일 주소가 잘못되었습니다. 올바른 메일 주소를 넣어주세요.";
        }

        var userName = email.split('@')[0];

        req.body = {
          email : email, 
          name : userName, 
          companyId: companyId,
          message: message
        }

        next();

      } else {

        // 회사 정보를 얻어온다. 
        Company.findOne({id: companyId}).then(function(company){

          var companyName = company.get('name');
          var companyDomain = company.get('domain');
          var userEmail = userName + '@' + companyDomain;
          
          req.body = {
            email : userEmail, 
            name : userName, 
            companyId: companyId
          }

          next();
        });

      }
      
    }
  },

  /**
   * TO: 민중
   * 인증 코드를 생성하는 작업은 여기서 진행하면 될듯
   */ 
  createCode: function(){

    return function(req, res, next) {

      next();
    }

  }


}



module.exports = authService;