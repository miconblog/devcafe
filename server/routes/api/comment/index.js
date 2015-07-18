'use strict';
var express = require('express');
var Comment = require('../../../app/models/comment.model');
var Post    = require('../../../app/models/post.model');
var router  = express.Router();

router.post('/', function(req, res){

  var content = req.body.content;
  var postId  = req.body.postId;
  var user    = req.session.user;

  if( !content) {
    res.status(500).json({ message: '댓글 내용이 입력되어 있지 않습니다.' });
    return;
  }

  Comment
  .create({
    content : content,
    username: user.name,
    postId  : postId,
    memberId: user.id
  })
  .then(function(comment){

    Post
    .findOne({where: {id: postId}})
    .then(function(post){
      post.commentCount = post.get('commentCount') + 1;
      post.save({silent:true});  
    });
    
    res.json({result:'OK', data:comment});
  });

});

router.delete('/:commentId', function(req, res){

  console.log(req.body);

  var user = req.session.user;
  var commentId  = req.params.commentId;

  Comment
  .findOne({where: { id: commentId, member_id: user.id } })
  .then(function(comment) {

    if(!comment){
      res.json({error: 'no comments'});
      return;
    }

    comment
    .destroy()
    .then(function(){

      Post
      .findOne({where: {id: comment.postId}})
      .then(function(post){
        post.commentCount = post.commentCount - 1;
        post.save();
      });

      res.json({result:'OK'});
    });
  });

});

module.exports = router;