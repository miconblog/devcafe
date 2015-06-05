/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/lastest/docs/models-usage
 */

'use strict';

var Company = require('../company/company.model');

var renderReact = require('../../libs/render-react');
var React = require('react');
var Home = React.createFactory(require('../../../flux/components/Home.jsx'));
var debug = require('debug')('home:controller');


exports.index = function(req, res) {

  console.log("locals", res.locals);

  res.render('home', renderReact(Home, {
    title: 'Express Home',
    path: 'home'
  }));

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

    console.log(companys);

    res.render('home', renderReact(Home, {
      title: '회원가입',
      path: 'signup',
      companys: companys
    }));

  });



  

};