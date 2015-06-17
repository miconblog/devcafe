/**
 * XSS Filter
 * POST와 PUT 메소드를 발라내서 body 안에 있는 내용은 무조건 sanitize 한다.
 */

'use strict';
var xss = require('xss');
var _ = require('lodash');


module.exports = function(req, res, next){
  
  if( req.method === 'POST' || req.method === 'PUT' ) {
    
    _.map(req.body, function(value, key, obj){

      return obj[key] = xss(value);
      
    });

   }

  next();
}