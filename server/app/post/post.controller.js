/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */
'use strict';

var Board = require('../board/board.model');
var Post = require('../post/post.model');
var Company = require('../company/company.model');
var renderReact = require('../../libs/render-react');
var React = require('react'),
    BoardList = React.createFactory(require('../../../flux/components/BoardList.jsx')),
    PostList = React.createFactory(require('../../../flux/components/PostList.jsx'));


exports.list = function(req, res){

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

exports.show = function(req, res){

  console.log("postdetail");

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

exports.create = function(req, res){

  var title = req.body.title;
  var content = req.body.content;
  var board = req.session.board;
  var user = req.session.user;

  if( !title || !content) {
    res.render('post', renderReact(PostList, {
      board: board,
      type: 'create',
      message: '제목과 내용은 비어있으면 안됩니다.'
    }));
    return;
  }

  Post.create({
    title: title,
    content: content,
    username: user.name,
    boardId: board.id,
    memberId: user.id
  });

  res.redirect("/boards/" + board.id);

}

exports.createForm = function(req, res){

  console.log("createForm");

  var board = req.session.board;

  res.render('post', renderReact(PostList, {
    board: board,
    type: 'create'
  }));

}