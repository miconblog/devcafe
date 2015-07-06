'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var path  = require('path');
var _     = require('lodash');

var all = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../..'),
  port: process.env.PORT || 3000,
  seedDB: false,
}

module.exports = _.merge(
  all, 
  require('./' + all.env + '.js') || {});