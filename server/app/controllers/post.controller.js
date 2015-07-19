'use strict';
var Board   = require('../models/board.model');
var Post    = require('../models/post.model');
var Company = require('../models/company.model');
var ReadPost= require('../models/read_post.model');
var Comment = require('../models/comment.model');
var moment  = require('moment');

// 게시글은 여러개의 댓글을 가진다. 게시글이 사라지면 해당 댓글도 전부 사라진다.
Post.hasMany(Comment, {foreignKey: 'postId', onDelete: 'cascade'})
Post.belongsTo(Board, {foreignKey: 'boardId', onDelete: 'cascade'});

exports.list = function(req, res, next){

  var page = req.query.p || 1;
  var pageSize = 10;

  Post.findAndCountAll({
    where : { boardId: req.params.boardId },
    limit : pageSize,
    offset : ( page - 1 ) * pageSize,
    order: '`createdAt` DESC'
  }).then(function(results){

    req.react = {
      component : 'PostMain',
      props: {
        board: req.board.get({plain:true}),
        type: 'list',
        page: page,
        pageSize: pageSize,
        totalCount: results.count,
        posts: JSON.parse(JSON.stringify(results.rows))
      }
    }
    next();

  });

};

exports.show = function(req, res, next){

  var user   = req.session.user;
  var postId = req.params.postId;

  Post
  .findOne({
    where: { id: postId },
    include: [ { model: Comment }, {model: Board} ]
  })
  .then(function(post){

    ReadPost.findOrCreate({
      where: {
        memberId:user.id,
        postId:post.id
      },
      defaults: {memberId:user.id, postId:post.id, lastUpdateAt:moment()}
    })
    .spread(function(readPost, created){

      // 마지막 Count 하며 읽은 날짜에서 하루 이상 지났을 때만 조회수 + 1 & lastUpdateAt 을 현재로 바꿔준다.
      if( created || 0 < moment().diff(moment(readPost.lastUpdateAt), 'days')  ){

        // increment 를 사용하는 것이 직관적으로 보이나 updatedAt 이 갱신되는 것을 피해갈 방법이 없다.
        // Post.build(post).increment('readCount');
        post.readCount = post.get('readCount') + 1;
        post.save({silent:true});
        readPost.update({lastUpdateAt:moment()}, {silent:true});
      }

      post = post.get({plain:true});
      post.isOwner = post.memberId === user.id;

      post.comments.map(function(comment){
        if( comment.memberId === user.id ) {
          return comment.isOwner = true;
        }
      });

      req.react = {
        component : 'PostMain',
        props: {
          type: 'detail',
          post: post
        }
      }
      next();
      
    });
  
  });
};

exports.edit = function(req, res, next){


  var user   = req.session.user;
  var postId = req.params.postId;

  Post
  .findOne({
    where: { id: postId },
    include: [ { model: Comment }, {model: Board} ]
  })
  .then(function(post){

    req.react = {
      component : 'PostMain',
      props: {
        type: 'edit',
        post: post
      }
    }
    next();
  });
};

exports.create = function(req, res, next){

  var title   = req.body.title;
  var content = req.body.content;
  var user    = req.session.user;
  var board   = req.board.get({plain:true});

  if( !title || !content) {

    req.react = {
      component : 'PostMain',
      props: {
        board: board,
        type: 'create',
        message: '제목과 내용은 비어있으면 안됩니다.'
      }
    }
    next();
    return;
  }

  Post.create({
    title: title,
    content: content,
    username: user.name,
    boardId: board.id,
    memberId: user.id
  })
  .then(function(){

    res.redirect("/boards/" + board.id);

  });

};

exports.writeForm = function(req, res, next){

  var board = req.board.get({plain:true});
 
  req.react = {
    component : 'PostMain',
    props: {
      board: board,
      type: 'create',
    }
  }
  next();

};

