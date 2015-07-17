var gulp   = require( 'gulp' );
var gutil = require('gulp-util');
var Q = require('q');

var Member      = require('../server/app/models/member.model');
var Board       = require('../server/app/models/board.model');
var Post        = require('../server/app/models/post.model');
var Comment     = require('../server/app/models/comment.model');
var Company     = require('../server/app/models/company.model');
var DBRelations = require('../server/libs/database/relations');
var DBSync      = require('../server/libs/database/sync');

function createCompanies() {

  return  Q.all([
    Company.create({
      name: 'SK planet',
      domain: 'sk.com'
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
      name: '관리자',
      email: 'admin@admin',
      password: 'admin',
      role: 'admin',
      shouldResetPassword: 0,
      emailVerified: 1
    }),
    
    Member.create({
      name: 'Lim SungMook',
      password: '1234',
      email: 'ipes4579@gmail.com',
      companyId: 1
    }),

    Member.create({
      name: 'Kim HyunDong',
      password: '1234',
      email: 'hyundong@gmail.com'
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

  var dummyPosts = [];
  for( var i = 0; i < 150; i++ ){
    dummyPosts.push(
      Post.create({
        title: i + '번째 테스트입니다. ',
        content: "테스트 테스트",
        username: "테스트봇",
        boardId: "skp",
        memberId: 2
      })
    );
  }

  for( var i = 0; i < 50; i++ ){
    dummyPosts.push(
      Post.create({
        title: i + '번째 테스트입니다. ',
        content: "테스트 테스트",
        username: "테스트봇",
        boardId: "free",
        memberId: 2
      })
    );
  }

  for( var i = 0; i < 50; i++ ){
    dummyPosts.push(
      Post.create({
        title: i + '번째 테스트입니다. ',
        content: "테스트 테스트",
        username: "테스트봇",
        boardId: "jobs",
        memberId: 2
      })
    );
  }
  
  return Q.all([dummyPosts])
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

  DBRelations();
  DBSync({force:true}).then(function(){
    excuteSample(done);
  });
    
});
