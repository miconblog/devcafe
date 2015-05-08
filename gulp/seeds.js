var gulp   = require( 'gulp' );
var gutil = require('gulp-util');

var User = require('../server/app/user/user.model');
var Board = require('../server/app/board/board.model');
var Post = require('../server/app/post/post.model');
var Comment = require('../server/app/comment/comment.model');

gulp.task('seeds', ['dbcheck'],function(done){

  var testUser;


  User.drop();
  Comment.drop();
  Post.drop();
  Board.drop();

  Comment.belongsTo(Post, {
    constraints: false
  }); 


  User.sync()

  .then(function () {

    User.create({
      name: 'Sohn ByungDae',
      email: 'miconblog@gmail.com',
      password: '1234'
    }).then(function(user){
      testUser = user;
    })
    
    User.create({
      name: 'Lim SungMook',
      password: '1234',
      email: 'sungmook@gmail.com',
    })

    User.create({
      name: 'Kim HyunDong',
      password: '11',
      email: 'hyundong@gmail.com',
    })
    
    User.create({
      name: 'Kim MinJung',
      password: '1234',
      email: 'minjung@gmail.com',
    })

  })

  .then(function(){

    Board.sync().then(function(){

      Board.create({
        name: 'skp'
      }).then(function(board){

        Post.sync().then(function(){

          var boardId = board.get('id');
        
          Post.create({
            title: '글쓰기 테스트',
            content: '이것은 본문입니다.',
            boardId: boardId,
            writer: testUser.get('name'),
            writerId: testUser.get('id')
          })
          .then(function(post){

            Comment.sync().then(function(){

              Comment.create({
                postId: post.get('id'),
                content: '이것은 댓글 테스트 입니다.!!',
                writer: testUser.get('name'),
                writerId: testUser.get('id')
              })

              done();

            })
          })
        })
      })
    })
  })

});
