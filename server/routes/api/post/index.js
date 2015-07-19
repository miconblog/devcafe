'use strict';
var express = require('express');
var Post    = require('../../../app/models/post.model');
var moment  = require('moment');
var router  = express.Router();

router.put('/:postId', function(req, res){

  var title = req.body.title;
  var content = req.body.content;
  var postId  = req.params.postId;
  var user    = req.session.user;

  if( !content || !title) {
    res.status(500).json({ message: '내용과 제목이 입력되지 않았습니다.' });
    return;
  }

  Post
  .findOne({where: {id: postId}})
  .then(function(post){

    post.title = title;
    post.content = content;
    post.updatedAt = moment();
    post.save({silent:true});  
    res.json({result:'OK', data:post});

  });

});

router.delete('/:postId', function(req, res){

  var user   = req.session.user;
  var postId = req.params.postId;

  Post
  .findOne({where: {id: postId}})
  .then(function(post){
    post.destroy();
    res.json({result:'OK'});
  });

});

module.exports = router;