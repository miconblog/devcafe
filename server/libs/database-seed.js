'use strict';
var User = require('../app/user/user.model');
var Board = require('../app/board/board.model');

module.exports = function(cb){

  Board.sync({force: true}).then(function(){

    Board.create({
      name: 'skp'
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



