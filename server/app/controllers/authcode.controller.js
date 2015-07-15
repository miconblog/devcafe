'use strict';
var Member      = require('../models/member.model');
var AuthCode    = require('../models/authcode.model');
var crypto      = require('crypto');
var moment      = require('moment');

function setError(req, code){
  req.error = {
    message: "인증코드가 유효하지 않습니다.",
    errcode: code
  }
}

exports.make = function(req, res, next) {
  if( req.error){ return next() }

  console.log("AuthCode.make > BODY", req.body);
  req.authcode = crypto.createHash('md5').update(moment().format()).digest('hex');

  AuthCode
  .findOrCreate({ 
    where: {email: req.body.email}, 
    defaults: {
      email: req.body.email, 
      code: req.authcode,
      created_at: moment(),
      expired_at: moment().add(2, 'days')
    }
  })
  .spread(function(code, created) {

    if( !created ) {
      code.code = req.authcode;
      code.created_at = moment();
      code.expired_at = moment().add(2, 'days');;
      code.save()
    }

    next();
  })

};

/**
 * 인증테이블에 해당코드와 이메일이 있는지 확인하고 있으면, 
 * user의 emailVerify=1로 바꿔준뒤에 패스워드 변경 페이지로 이동시킨다.  
 */
exports.confirm = function(req, res, next) {
  var code = req.query.code;
  var email = req.query.email;

  if( !code || !email ) {
    setError(req, 404);
    return next();
  }
    
  if( code.length !== 32 ) {
    setError(req, 102);
    return next();
  }

  AuthCode
  .findOne({where: {email:email, code:code}})
  .then(function(hashcode){

    if(!hashcode){
      setError(req, 100);
      return next(); 
    }

    // 인증날짜가 유효한지 한번더 검토...
    var expired = hashcode.get('expired_at');
    if( moment(expired) < moment() ) {
      setError(req, 101);
      return next();
    }

    Member
    .findOne({where: {email:email}})
    .then(function(member){
      member.emailVerified = 1;
      member.save();

      // 이메일 인증이 성공하면 무조건 패스워드를 설정해야한다.
      req.session.user = member;
      req.session.isVerified = true;
      next();
    });
 
  });
  
};
