'use strict';
var Member  = require('../../app/models/member.model');
var Board   = require('../../app/models/board.model');
var Post    = require('../../app/models/post.model');
var ReadUser= require('../../app/models/read_user.model');
var Comment = require('../../app/models/comment.model');
var Company = require('../../app/models/company.model');
var AuthCode= require('../../app/models/authcode.model');

module.exports = function(){

  // 회사는 여러 사원을 가지지만 회사가 망하면 멤버는 실직하다. 즉, 회사ID는 자동으로 NULL이 된다.
  Company.hasMany(Member);

  // 회사는 여러개의 게시판을 가진다. 회사가 망하면 게시판도 망한다.
  Company.hasMany(Board);

  // 게시판은 여러개의 게시글을 가진다. 게시판이 사라지면 해당 게시글도 전부 지워진다.
  Board.hasMany(Post, {onDelete: 'cascade'});

  // 게시글은 여러개의 댓글을 가진다. 게시글이 사라지면 해당 댓글도 전부 사라진다.
  Post.hasMany(Comment, {onDelete: 'cascade'})

  // 게시글은 작성자가 존재한다. 회원이 삭제되도 게시글은 유지된다.
  Post.belongsTo(Member);

  // 댓글은 작성자가 존재한다.
  Comment.belongsTo(Member);

  // ReadUser는 읽은 회원과 게시글을 갖고 있는 관계 테이블이다. 게시글이나 회원이 사라지면 관계 테이블 또한 사라진다.
  ReadUser.belongsTo(Post);
  ReadUser.belongsTo(Member);

};



