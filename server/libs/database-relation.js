'use strict';
var Member = require('../app/member/member.model');
var Board = require('../app/board/board.model');
var Post = require('../app/post/post.model');
var Comment = require('../app/comment/comment.model');
var Company = require('../app/company/company.model');
var CompanyBoards = require('../app/company/company_boards.model');

var Q = require('q');
Q.longStackSupport = true;

module.exports = function(){
  var deferred = Q.defer();


  // 사원은 companyId를 가진다. 회사가 망하면 멤버의 회사ID는 자동으로 NULL이 된다. (if constraints is true)
  Member.belongsTo(Company, { constraints: false }); 

  // 게시글은 boardId와 memberId를 가진다.  
  Post.belongsTo(Board, { constraints: false });
  Post.belongsTo(Member, { constraints: false });

  // 댓글은 postId와 memberId를 가진다. 게시글을 지우려면 댓글을 모두 지워야 한다. (if constraints is true)
  Comment.belongsTo(Post, { constraints: false }); 
  Comment.belongsTo(Member, { constraints: false })

  // 회사 게시판은 conpnayId와 boardId를 가딘다. 
  Company.belongsToMany(Board, {through: 'company_boards', constraints: false});
  Board.belongsToMany(Company, {through: 'company_boards', constraints: false}); 


  Member.sync();
  Company.sync();
  Board.sync();
  CompanyBoards.sync();
  Post.sync();
  Comment.sync().then(function(){
    deferred.resolve();
  })

  return deferred.promise;
};



