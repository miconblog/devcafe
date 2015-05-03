'use strict';
var User = require('../app/user/user.model');
var Board = require('../app/board/board.model');
var Post = require('../app/post/post.model');

module.exports = function(cb){

  Board.sync({force: true}).then(function(){

    Board.create({
      name: 'skp'
    })

  });


  Post.sync({force: true}).then(function(){

    Post.create({
      title: '글쓰기 테스트',
      content: '이것은 본문입니다.'
    })

  });



  User.sync({force: true}).then(function () {
    // Table created

    User.create({
      name: 'Sohn ByungDae',
      email: 'miconblog@gmail.com',
      password: '1234'
    });
    
    User.create({
    
      name: 'Lim SungMook',
      password: '1234'
    
    }).catch(function(err){
      console.log("submook passoword", err)
    })

    User.create({
    
      name: 'Kim HyunDong',
      password: '11'
    
    }).catch(function(err){
      console.log("submook passoword", err)
    });
    
    User.create({
      
      name: 'Kim MinJung',
      password: '1234'

    }).catch(function(err){
      console.log("submook passoword", err)
    });

    cb();
  });

};



