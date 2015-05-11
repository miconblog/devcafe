/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';

//var Home = require('./home.model');
var renderReact = require('../../libs/render-react');
var React = require('react'),
    Home = React.createFactory(require('../../../flux/components/Home.jsx'));

exports.index = function(req, res) {

  res.render('home', renderReact(Home, {
    title: 'Express Home',
    path: 'home'
  }));

};

exports.register = function(req, res) {

  res.render('home', renderReact(Home, {
    title: '회원가입',
    path: 'signin'
  }));

};
