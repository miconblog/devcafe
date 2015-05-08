'use strict';
var User = require('../app/user/user.model');
var Board = require('../app/board/board.model');
var Post = require('../app/post/post.model');
var Comment = require('../app/comment/comment.model');
var Q = require('q');

module.exports = function(){
  var deferred = Q.defer();
  var testUser;

  // Board.hasMany(Post);
  // Post.belongsTo(User, {as:'writer'});
  // Comment.belongsTo(User, {as:'writer'});

  // 댓글은 삭제해도 포스트에 영향을 주면 안된다. 따라서 댓글이 삭제될때 관련 레퍼랜스로 트리거 되는 constraints는 없다!
  Comment.belongsTo(Post, {
    constraints: false

  }); 

  User.sync();
  Board.sync();
  Post.sync();
  Comment.sync().then(function(){
    deferred.resolve();
  })

  return deferred.promise;
};



