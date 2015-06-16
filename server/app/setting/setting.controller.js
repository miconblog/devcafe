/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';


var Company = require('../company/company.model');
var Member = require('../member/member.model');
var Board = require('../board/board.model');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
var debug = require('debug')('server:controller:setting');


exports.index = function(req, res, next){
  req.react = {
    component : 'Settings',
    props : {}
  }
  next();
};


exports.memberInfo = function(req, res, next){
  req.react = {
    component : 'Settings',
    props : {
      member : req.session.user,
      type : 'memberInfo'
    }
  }
  next();
};

exports.password = function(req, res, next){
  req.react = {
    component : 'Settings',
    props : {
      member : req.session.user,
      type : 'password'
    }
  }
  next();
}
// 아직은 /resetPassword 지만 이것도 /setting/resetPassword 가 되어야할 것 같다.
//exports.resetPassword = function(req, res, next) {
//
//  req.react = {
//    component : 'ResetPass',
//    props: {
//      member : req.session.user
//    }
//  }
//  next();
//
//};
