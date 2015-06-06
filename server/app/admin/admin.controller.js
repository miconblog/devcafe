/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/lastest/docs/models-usage
 */

'use strict';

//var Home = require('./home.model');
//console.log(__dirname)
var Company = require('../company/company.model');
var Member = require('../member/member.model');
var Board = require('../board/board.model');
var renderReact = require('../../libs/render-react');
var React = require('react');
var Admin = React.createFactory(require('../../../flux/components/pages/Admin.jsx'));



exports.index = function(req, res) {


  Member.all().then(function(members){

    Board.all().then(function(boards){

      Company.all().then(function(companys){
        
        res.render('admin', renderReact(Admin, {
          boards: boards,
          members: members,
          companys: companys
        }));

      });

    });

  });
  
};
