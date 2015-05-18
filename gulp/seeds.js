var gulp   = require( 'gulp' );
var gutil = require('gulp-util');

var Member = require('../server/app/member/member.model');
var Board = require('../server/app/board/board.model');
var Post = require('../server/app/post/post.model');
var Comment = require('../server/app/comment/comment.model');
var Company = require('../server/app/company/company.model');
var CompanyBoards = require('../server/app/company/company_boards.model');

gulp.task('seeds', ['dbcheck'],function(done){

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



  // 기존 DB 삭제
  Comment.drop();
  Post.drop();
  Board.drop();
  Member.drop();
  Company.drop();
  CompanyBoards.drop();

  // 샘플 회사 등록 
  Company.sync()
  .then(function(){
    
    Company.create({
      name: 'SK planet'
    });

    Company.create({
      name: 'NHN Entertainment'
    });

  });


  // 샘플 회원 등록
  Member.sync()
  .then(function () {

    Member.create({
      name: 'Sohn ByungDae',
      email: 'miconblog@gmail.com',
      password: '1234'
    }).then(function(user){
      user.setCompany(1);
    })
    
    Member.create({
      name: 'Lim SungMook',
      password: '1234',
      email: 'sungmook@gmail.com',
    }).then(function(user){
      user.setCompany(1);
    })

    Member.create({
      name: 'Kim HyunDong',
      password: '11',
      email: 'hyundong@gmail.com',
    })
    
    Member.create({
      name: 'Kim MinJung',
      password: '1234',
      email: 'minjung@gmail.com',
    }).then(function(user){
      user.setCompany(2);
    })
  })


   // 샘플 게시판 생성
  Board.sync().then(function(){

    Board.create({
      name: 'skp'
    })
    .then(function(board){

      // 회사-게시판 테이블 싱크
      CompanyBoards.sync().then(function(){

        CompanyBoards.create({
          companyId : 1,
          boardId: 1
        })

      })      


    })
    .then(function(board){
      
      Post.sync().then(function(){
      
        // 샘플 게시글 생성
        Post.create({
          title: '글쓰기 테스트',
          content: '이것은 본문입니다.',
          writer: '불꽃남자'
        }).then(function(post){

          post.setBoard(1);
          post.setMember(1);

          Comment.sync().then(function(){

            // 샘플 댓글 생성
            Comment.create({
              content: '이것은 댓글 테스트 입니다.!!',
              username: '불꽃남자'
            }).then(function(comment){
              comment.setPost(1);
              comment.setMember(1);
              done();
            })

          });

        });

      });

    });

  });

});
