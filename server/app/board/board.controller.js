/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */
'use strict';

var Board = require('./board.model');
var Post = require('../post/post.model');
var Company = require('../company/company.model');
var renderReact = require('../../libs/render-react');
var React = require('react'),
    BoardList = React.createFactory(require('../../../flux/components/BoardList.jsx')),
    PostList = React.createFactory(require('../../../flux/components/PostList.jsx'));


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

exports.canAccess = function(req, res, next){

  var member = req.session.user;
  var boardId = req.params.boardId;

  Board.findOne({where: { id: boardId } })
  .then(function(board) {

    if(!board){
      res.sendStatus(404);
      return;
    }
    
    var type = board.get('type');
    var companyId = board.get('companyId');

    req.session.board = board.get({plain:true});

    if( type === 'C' && companyId === member.companyId ) {
      next();
    } else if( type === 'N' || type === 'L' ) {
      next();
    } else {
      delete req.session.board;
      res.sendStatus(401);
      return;
    }


  });

};

exports.postlist = function(req, res){

  var member = req.session.user;
  var board = req.session.board;
  var boardId = req.params.boardId;

  Post.findAll({
    where: {
      boardId: boardId
    }
  }).then(function(posts){

    res.render('post', renderReact(PostList, {
      board: board,
      posts: JSON.parse(JSON.stringify(posts))
    }));

  })

};

exports.postdetail = function(req, res){

  var member = req.session.user;
  var board = req.session.board;
  var boardId = req.params.boardId;
  var postId = req.params.postId;

  Post.findOne({
    where: {
      id: postId,
      boardId: boardId
    }
  }).then(function(post){

    if( !post ){
      // 아직 그런 페이지 자체가 없어!!
      res.sendStatus(404);
      return;
    }

    res.render('post', renderReact(PostList, {
      board: board,
      type: 'detail',
      post: post.get({plain:true})
    }));

  })

}