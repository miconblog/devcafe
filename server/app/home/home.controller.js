/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/lastest/docs/models-usage
 */

'use strict';

//var Home = require('./home.model');
//console.log(__dirname)
var renderReact = require('../../libs/render-react');
var React = require('react'),
    Home = React.createFactory(require('../../../flux/components/Home.jsx'));


exports.index = function(req, res) {

  res.render('home', renderReact(Home, {
    title: 'Express Home',
    path: 'home'
  }));

};

exports.signin = function(req, res) {

  res.render('home', renderReact(Home, {
    title: '로그인',
    path: 'signin'
  }));

};

exports.signup = function(req, res) {

  res.render('home', renderReact(Home, {
    title: '회원가입',
    path: 'signup'
  }));

};