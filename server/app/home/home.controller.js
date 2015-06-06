/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/lastest/docs/models-usage
 */

'use strict';

var Company = require('../company/company.model');
var Board = require('../board/board.model');
var renderReact = require('../../libs/render-react');
var React = require('react');
var Home = React.createFactory(require('../../../flux/components/pages/Home.jsx'));
var debug = require('debug')('server:controller:home');


exports.index = function(req, res) {

  console.log("locals", res.locals);

  if(!req.session.user){
    res.render('home', renderReact(Home, {
      path: 'home',
      boards: false,
      showTodoList: true
    }));
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

    res.render('home', renderReact(Home, {
      path: 'home',
      boards: boards,
      showTodoList: true
    }));

  });

  

};

exports.signin = function(req, res) {

  // 로그인 되어 있다면 홈으로 보내라!
  if( req.session.user ) {
    return res.redirect('/');
  }

  res.render('home', renderReact(Home, {
    title: '로그인',
    path: 'signin'
  }));

};

exports.signout = function(req, res) {

  req.session.destroy(function(err) {
    console.log("destroying session");
  });
  return res.redirect('/');


};

exports.signup = function(req, res) {

  // 로그인 되어 있다면 홈으로 보내라!
  if( req.session.user ) {
    return res.redirect('/');
  }

  /**
   * #16 회원가입 페이지에 가입가능한 회사 목록이 필요하다
   */

  Company.all().then(function(companies){

    var companys = JSON.parse(JSON.stringify(companies)); 

    res.render('home', renderReact(Home, {
      title: '회원가입',
      path: 'signup',
      companys: companys
    }));

  });



  

};