/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/lastest/docs/models-usage
 */

'use strict';

var Company = require('../company/company.model');
var Board = require('../board/board.model');
var React = require('react');
var debug = require('debug')('server:controller:home');


exports.index = function(req, res, next) {

  if(!req.session.user){

    req.react = {
      component : 'Home',
      props: {
        path: 'home',
        boards: false,
        showTodoList: true
      }
    }
    next();
    return;
  }

  var member = req.session.user;
  var companyId = member.companyId;

  Board.findAll({
    where: {  
      $or: [
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
      ]
    }

  }).then(function(boards){

    req.react = {
      component : 'Home',
      props: {
        path: 'home',
        boards: boards,
        showTodoList: true
      }
    }
    next();
  });

  

};

exports.signin = function(req, res, next) {

  // 로그인 되어 있다면 홈으로 보내라!
  if( req.session.user ) {
    return res.redirect('/');
  }

  req.react = {
    component : 'Home',
    props: {
      title: '로그인',
      path: 'signin'
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
        companys: companys
      }
    }
    next();

  });
};