/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/lastest/docs/models-usage
 */

'use strict';

//var Home = require('./home.model');
//console.log(__dirname)
var renderReact = require('../../libs/render-react');
var React = require('react'),
    Home = React.createFactory(require('../../../flux/components/pages/Home.jsx'));


exports.index = function(req, res) {

  res.render('home', renderReact(Home, {
    title: 'Express Home',
    path: 'home'
  }));

};