/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';

//var Home = require('./home.model');
var renderReact = require('../../libs/render-react');

exports.index = function(req, res) {

  res.render('home', renderReact({
    title: 'Express Home',
    path: 'home'
  }));

};
