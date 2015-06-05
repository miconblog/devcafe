var gulp   = require( 'gulp' );
var gutil = require('gulp-util');
var Q = require('Q');

var Member = require('../server/app/member/member.model');
var Board = require('../server/app/board/board.model');
var Post = require('../server/app/post/post.model');
var Comment = require('../server/app/comment/comment.model');
var Company = require('../server/app/company/company.model');

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

function dropAllTables(){
  var deferred = Q.defer();

  Comment.drop().then(function(){
    Post.drop().then(function(){
      Board.drop().then(function(){
        Member.drop().then(function(){
          Company.drop().then(function(){

            console.log("\n----------- drop all tables ------------ \n\n")
            deferred.resolve();
          })
        })    
      })  
    })
  })
  return deferred.promise;
}

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

function createCompanies() {

  return  Q.all([
    Company.create({
      name: 'SK planet',
      domain: 'skplanet.com'
    }),

    Company.create({
      name: 'NHN Entertainment',
      domain: 'nhnent.com'
    })

  ])
}

function createMembers() {

  return Q.all([

    Member.create({
      name: 'Sohn ByungDae',
      email: 'miconblog@gmail.com',
      password: '1234',
      companyId: 1
    }),
    
    Member.create({
      name: 'Lim SungMook',
      password: '1234',
      email: 'sungmook@gmail.com',
      companyId: 1
    }),

    Member.create({
      name: 'Kim HyunDong',
      password: '1234',
      email: 'hyundong@gmail.com',
    }),
    
    Member.create({
      name: 'Kim MinJung',
      password: '1234',
      email: 'minjung@gmail.com',
      companyId: 2
    })

  ]);

}

function createBoards(){
  return Q.all([

    Board.create({
      id: 'jobs',
      name: '구인/구직',
      type: 'N',
      companyId: null
    }),

    Board.create({
      id: 'free',
      name: '자유게시판',
      type: 'N',
      companyId: null
    }),

    Board.create({
      id: 'nhnent',
      name: 'NHN 엔터테인먼트',
      type: 'C',
      companyId: 2
    }),

    Board.create({
      id: 'skp',
      name: 'SK 플래닛',
      type: 'C',
      companyId: 1
    })

  ]);
}

function createPosts(){

  return Q.all([

    Post.create({
      title: '글쓰기 테스트',
      content: '이것은 본문입니다.',
      username: '불꽃남자',
      boardId: 'skp',
      memberId: 1
    })

  ])
}

function createComments() {

  return Q.all([

    Comment.create({
      content: '이것은 댓글 테스트 입니다.!!',
      username: '불꽃남자',
      postId: 1,
      memberId: 1
    })

  ])
}

function excuteSample(done){

  createCompanies().then(function(){
    console.log("OK, company\n");
    createMembers().then(function(){
      console.log("OK, member\n");
      createBoards().then(function(){
        console.log("OK, board\n");
        createPosts().then(function(){
          console.log("OK, post\n");
          createComments().then(function(){
            console.log("OK, comment\n");
            done();
          })
        })
      })
    })
  })
}

gulp.task('seeds', ['dbcheck'],function(done){

  // 기존 DB 삭제
  dropAllTables().then(function(){

    syncAllTables().then(function(){

      excuteSample(done);

    })
    
  })

});
