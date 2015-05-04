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


  User.sync({force:true})

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
    
    }).catch(function(err){
      console.log("submook passoword", err)
    })

    User.create({
    
      name: 'Kim HyunDong',
      password: '11',
      email: 'hyundong@gmail.com',
    
    }).catch(function(err){
      console.log("submook passoword", err)
    });
    
    User.create({
      
      name: 'Kim MinJung',
      password: '1234',
      email: 'minjung@gmail.com',

    }).catch(function(err){
      console.log("submook passoword", err)
    });

  })

  .then(function(){

    Board.sync({force: true}).then(function(){

      Board.create({
        name: 'skp'
      }).then(function(board){

        Post.sync({force: true}).then(function(){

          var boardId = board.get('id');
          console.log(' TEST USER: ', testUser.get({plain:true}));
        
          Post.create({
            title: '글쓰기 테스트',
            content: '이것은 본문입니다.',
            boardId: boardId,
            writer: testUser.get('name'),
            writerId: testUser.get('id')
          })
          .then(function(post){

            Comment.sync({force: true}).then(function(){

              Comment.create({
                postId: post.get('id'),
                content: '이것은 댓글 테스트 입니다.!!',
                writer: testUser.get('name'),
                writerId: testUser.get('id')
              })

              deferred.resolve();

            })
          
          })

        })
        .catch(function(){
          console.log("\n레퍼랜스가 걸려있어서 포스트를 지우려면 관련 댓글을 모두 지워야합니다. 관련 댓글을 모두 지울테니 재실행해주세요!!\n");
          Comment.drop();
        })

      })

    }).catch(function(){

      console.log("\n 1.레퍼랜스가 걸려있어서 게시판을 지우려면 관련 포스트를 모두 지워야합니다. 관련 포스트를 모두 지울테니 재실행해주세요!!\n");
      
      Post.drop()
      .catch(function(){
        Comment.drop();
      });

      Board.drop()

    })

  })


  return deferred.promise;
};



