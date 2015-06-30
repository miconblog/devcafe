'use strict';
var React   = require('react');
var Company = require('../models/company.model');
var Board   = require('../models/board.model');
var debug   = require('debug')('server:controller:home');


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

  /**
   * #16 회원가입 페이지에 가입가능한 회사 목록이 필요하다
   */

  Company.all().then(function(companies){

    var companys = JSON.parse(JSON.stringify(companies)); 

    req.react = {
    component : 'Home',
      props: {
        title: '회원가입',
        path: 'signup',
        isAuth: false,
        companys: companys
      }
    }
    next();

  });
};