'use strict';
var Board   = require('../models/board.model');
var Post    = require('../models/post.model');
var Company = require('../models/company.model');
var ReadPost= require('../models/read_post.model');
var Comment = require('../models/comment.model');
var moment  = require('moment');

/**
 * 미들웨어로써 post 객체를 세션에 추가해 불필요한 코드 중복을 없앤다.
 * 최종 라우터에서 post 객체를 삭제할수도 있기 때문에 모델 인스턴스를 그대로 담아둔다.
 * 사용후에는 반드시 세션에 담아둔 post 객체를 제거하자.
 * 따라서 모델을 사용하고 싶다면 post.get(xxx) 형태로 써야한다.
 * post 객체의 유무도 미들웨어가 검증하기 때문에 라우터에서는 안심하고 써도 된다.
 */
exports.canAccess = function(req, res, next){

  var user    = req.session.user;
  var postId  = req.params.postId;

  Post.findOne({where: { id: postId } })
  .then(function(post) {

    if(!post){
      res.sendStatus(404);
      return;
    }

    req.session.post = post;
    req.session.post.isOwner = post.get('memberId') === user.id;
    next();

  });
};

exports.list = function(req, res, next){

  var board = req.session.board.get({plain:true});
  delete req.session.board;

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
        board: board,
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

  var user      = req.session.user;
  var board     = req.session.board.get({plain:true});
  var post      = req.session.post;

  delete req.session.board;

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
    post.isOwner  = req.session.post.isOwner;
    delete req.session.post;

    Comment.findAndCountAll({
      where : { postId: post.id },
      limit : 100,
      offset : 0,
      order: '`createdAt` ASC'
    }).then(function(result){
      post.comments = result.rows;
      var i;
      for(i in post.comments){
        post.comments[i] = post.comments[i].get({plain:true});
        post.comments[i].isOwner = post.comments[i].memberId == user.id;
        console.log("server comment {}", post.comments[i]);
      }

      req.react = {
        component : 'PostMain',
        props: {
          board: board,
          type: 'detail',
          post: post
        }
      }
      next();
    });
  });
};

exports.edit = function(req, res, next){

  var board     = req.session.board.get({plain:true});
  var post      = req.session.post.get({plain:true});
  post.isOwner  = req.session.post.isOwner;

  delete req.session.post;
  delete req.session.board;

  req.react = {
    component : 'PostMain',
    props: {
      board: board,
      type: 'edit',
      post: post
    }
  }
  next();

};

exports.create = function(req, res, next){

  var title   = req.body.title;
  var content = req.body.content;
  var user    = req.session.user;
  var board   = req.session.board.get({plain:true});

  delete req.session.board;

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

exports.delete = function(req, res, next){

  var post = req.session.post;

  delete req.session.post;
  delete req.session.board;


  if( !post.isOwner ){
    res.status(401).json({ error: '작성자외엔 삭제할 수 없습니다.' });
    return;
  }

  post.destroy().then(function(){
    res.json({result:'OK'});
  });

};

exports.update = function(req, res, next){

  var post    = req.session.post;
  var title   = req.body.title;
  var content = req.body.content;

  delete req.session.post;
  delete req.session.board;

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

  if( !post.isOwner ){
    res.status(401).json({ error: '작성자외엔 수정할 수 없습니다.' });
    return;
  }

  post.title = title;
  post.content = content;
  post.updatedAt = new Date();
  post.save().then(function(){

    res.json({result:'OK'});

  });

};


exports.form = function(req, res, next){

  var board = req.session.board.get({plain:true});
  delete req.session.board;

  req.react = {
    component : 'PostMain',
    props: {
      board: board,
      type: 'create',
    }
  }
  next();

};

exports.createComment = function(req, res, next){


  var content = req.body.content;
  var post    = req.session.post;
  var user    = req.session.user;
  var board   = req.session.board.get({plain:true});

  delete req.session.board;

  if( !content) {
    res.status(500).json({ message: '댓글 내용이 입력되어 있지 않습니다.' });
    return;
  }

  Comment.create({
    content: content,
    username: user.name,
    postId :req.params.postId,
    boardId: board.id,
    memberId: user.id
  })
    .then(function(comment){
      post.commentCount = post.get('commentCount') + 1;
      post.save({silent:true});
      res.json({result:'OK', data:comment});
    });
};

exports.deleteComment = function(req, res, next){

  var post = req.session.post;
  var user = req.session.user;
  var commentId  = req.params.commentId;

  Comment.findOne({where: { id: commentId } })
    .then(function(comment) {

      if(!comment){
        res.sendStatus(404);
        return;
      }

      comment.isOwner = comment.get('memberId') === user.id;
      if( !comment.isOwner ){
        res.status(401).json({ error: '작성자외엔 삭제할 수 없습니다.' });
        return;
      }
      comment.destroy().then(function(){
        post.commentCount = post.commentCount - 1;
        post.save();
        res.json({result:'OK'});
      });
    });
};
