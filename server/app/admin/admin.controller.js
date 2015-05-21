/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/lastest/docs/models-usage
 */

'use strict';

//var Home = require('./home.model');
//console.log(__dirname)
var Company = require('../company/company.model');
var Board = require('../board/board.model');
var renderReact = require('../../libs/render-react');
var React = require('react'),
    Admin = React.createFactory(require('../../../flux/components/Admin.jsx'));



exports.index = function(req, res) {


   var member = req.session.user;

  // 1. 회사 아이디
  var companyId = member.companyId;

  Board.findAll({
    where: {
      companyId: companyId
    } 
  }).then(function(boards){

    res.render('admin', renderReact(Admin, {
      boards: boards
    }));

  });
};
