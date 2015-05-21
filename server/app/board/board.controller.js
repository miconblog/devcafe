/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */
'use strict';

var Board = require('./board.model');
var Company = require('../company/company.model');
var renderReact = require('../../libs/render-react');
var React = require('react'),
    BoardList = React.createFactory(require('../../../flux/components/BoardList.jsx'));


// 내가 접근 가능한 게시판 목록만 보여준다.
exports.index = function(req, res) {

  var member = req.session.user;
  var companyId = member.companyId;

  Board.findAll({
    where: {  
      $or: [
        {
          type: {
            $eq: 'N'
          }
        },
        {
          companyId: {
            $eq: companyId 
          }
        }       
      ]
    }

  }).then(function(boards){

    res.render('board', renderReact(BoardList, {
      title: 'Express Board',
      path: 'boards',
      boards: boards
    }));

  });

};

exports.show = function(req, res){

  var member = req.session.user;
  var boardId = req.params.boardId;




  

}
