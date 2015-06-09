/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/lastest/docs/models-usage
 */

'use strict';

//var Home = require('./home.model');
//console.log(__dirname)

exports.index = function(req, res, next) {

  req.react = {
    component : 'Home',
    props : {
      title: 'Express Home',
      path: 'home'
    }
  };
  next();

};