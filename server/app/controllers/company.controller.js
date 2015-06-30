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