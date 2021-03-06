'use strict';
var Board   = require('../models/board.model');
var Post    = require('../models/post.model');
var Company = require('../models/company.model');

exports.canAccess = function(req, res, next){

  var member = req.session.user;
  var regx = /\/boards\/(\w+)/;
  var boardId = regx.exec(req.originalUrl)[1]; 

  Board.findOne({where: { id: boardId } })
  .then(function(board) {

    if(!board){
      res.sendStatus(404);
      return;
    }
    
    var type = board.get('type');
    var companyId = board.get('companyId');

    req.board = board;

    // 관리자는 무조건 접근 가능하다.
    if( res.locals.isAdmin ){
      return next();
    }


    if( type === 'C' && companyId === member.companyId ) {
      next();
    } else if( type === 'N' || type === 'L' ) {
      next();
    } else {
      res.sendStatus(401);
      return;
    }

  });

};

// 내가 접근 가능한 게시판 목록만 보여준다.
exports.index = function(req, res, next) {

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

    req.react = {
      component: 'BoardList',
      props: {
        title: 'Express Board',
        path: 'boards',
        boards: boards
      }
    }
    next();

  });

};