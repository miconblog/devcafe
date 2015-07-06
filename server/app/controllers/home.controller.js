'use strict';
var React   = require('react');
var Company = require('../models/company.model');
var Board   = require('../models/board.model');
var debug   = require('debug')('server:controller:home');
var _       = require('lodash');


exports.index = function(req, res, next) {

  res.locals.showSignupBtn = true;

  if(!req.session.user){

    req.react = {
      component : 'Home',
      props: {
        path: 'home',
        isAuth: false,
        boards: false,
        showTodoList: true
      }
    }
    next();
    return;
  }

  var member = req.session.user;
  var companyId = member.companyId;
  var whereCond = [
    {
      type: {
        $eq: 'N'
      }
    },
    {
      companyId: {
        $eq: companyId 
      }
    }       
  ];

  // 관리자는 모든 게시판이 나와야해.
  if( res.locals.isAdmin ){
    whereCond = [];
  }

  Board.findAll({
    where: {  
      $or: whereCond
    }

  }).then(function(boards){

    req.react = {
      component : 'Home',
      props: {
        isAuth: true,
        path: 'home',
        boards: boards
      }
    }
    next();
  });
};

/**
 * 인증테이블에 해당코드와 이메일이 있는지 확인하고 있으면, 
 * user의 emailVerify=1로 바꿔준뒤에 패스워드 변경 페이지로 이동시킨다.  
 */
exports.confirm = function(req, res) {
  if(req.error){
    req.react = {
      component : 'Home',
      props: {
        path: 'message',
        isAuth: false,
        message : req.error.message
      }
    }
    return next();
  }
  res.redirect("/account/resetPassword");
};

exports.resetPassword = function(req, res, next) {

  req.react = {
    component : 'ResetPass',
    props: {
      member : req.session.user
    }
  }
  next();

};

exports.findPassword = function(req, res, next) {

  // 로그인 되어 있다면 홈으로 보내라!
  if( req.session.user ) {
    return res.redirect('/');
  }

  res.locals.showSigninBtn = true;
  req.react = {
    component : 'Home',
    props: {
      path: 'findPassword'
    }
  }


  if(req.message) {

    req.react.props = {
      path: 'findPasswordDone',
      message : req.message
    }
  }
  next();

};

exports.signout = function(req, res) {

  req.session.destroy(function(err) {
    console.log("destroying session");
  });
  return res.redirect('/');
};

exports.signup = function(req, res, next) {

  res.locals.showSigninBtn = true;

  // 로그인 되어 있다면 홈으로 보내라!
  if( req.session.user ) {
    return res.redirect('/');
  }

  // 회원가입이 완료 됐다면 
  if(req.completeSignUp) {
    req.react = {
      component : 'Home',
      props: {
        path: 'message',
        isAuth: false,
        message : req.message
      }
    }

    return next();
  }

  /**
   * #16 회원가입 페이지에 가입가능한 회사 목록이 필요하다
   */
  Company.all().then(function(companies){

    var companys = JSON.parse(JSON.stringify(companies)); 

    req.react = {
    component : 'Home',
      props: {
        path: 'signup',
        isAuth: false,
        companys: companys,
        message: req.error ? req.error.message : req.message
      }
    }
    next();

  });
};