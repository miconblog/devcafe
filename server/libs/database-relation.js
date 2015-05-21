'use strict';
var Member = require('../app/member/member.model');
var Board = require('../app/board/board.model');
var Post = require('../app/post/post.model');
var Comment = require('../app/comment/comment.model');
var Company = require('../app/company/company.model');

var Q = require('q');
Q.longStackSupport = true;


function syncAllTables(){
  var deferred = Q.defer();

  Company.sync().then(function(){
    Member.sync().then(function(){
      Board.sync().then(function(){
        Post.sync().then(function(){
          Comment.sync().then(function(){

            console.log("\n----------- sync all tables ------------ \n\n")
            deferred.resolve();
          })
        })    
      })  
    })
  })
  return deferred.promise;  
}

module.exports = function(){
  var deferred = Q.defer();

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


  syncAllTables().then(function(){
    deferred.resolve();
  })

  return deferred.promise;
};



