/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';

var Member = require('../member/member.model');
var AuthCode = require('../authcode/authcode.model');
var renderReact = require('../../libs/render-react');
var React = require('react');
var Home = React.createFactory(require('../../../flux/components/pages/Home.jsx'));

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();



/**
 * 인증테이블에 해당코드와 이메일이 있는지 확인하고 있으면, 
 * user의 emailVerify=1로 바꿔준뒤에 패스워드 변경 페이지로 이동시킨다.  
 */
exports.confirm = function(req, res) {
  var code = req.query.code;
  var email = req.query.email;

  if( !code || !email ) {
    res.render('error', {
      errcode: 300,
      message: '잘못된 접근입니다. 꺼지세요!'
    });
  }else {
    
    if( code.length !== 10 ) {
      return res.render("error", {
        errcode: 301,
        message:"유효한 인증코드가 아닙니다. (10자리 코드여야함)" 
      });
    }


    AuthCode.findOne({where: {email:email, hashcode:code}})
    .then(function(hashcode){

      var hashcode = true;

      if(hashcode){

        Member.findOne({where: {email:email}})
        .then(function(member){
          member.emailVerified = 1;
          member.save();

          // 이메일 인증이 성공하면 무조건 패스워드를 설정해야한다.
          req.session.user = member;
          req.session.isVerified = true;
          res.redirect("/resetPassword");
        });

      }else{

        res.render("error", {
          errcode: 302,
          message: "그런 인증코드는 없습니다." 
        }); 
      }
           
    });
  }

};
