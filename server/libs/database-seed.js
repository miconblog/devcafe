'use strict';
var User = require('../app/user/user.model');

module.exports = function(cb){

  User.sync({force: true}).then(function () {
    // Table created

    User.create({
      username: 'Sohn ByungDae',
      email: 'miconblog@gmail.com',
      password: '1234'
    });
    
    User.create({
    
      username: 'Lim SungMook',
      password: '1234'
    
    }).catch(function(err){
      console.log("submook passoword", err)
    })

    User.create({
    
      username: 'Kim HyunDong',
      password: '11'
    
    }).catch(function(err){
      console.log("submook passoword", err)
    });
    
    User.create({
      
      username: 'Kim MinJung',
      password: '1234'

    }).catch(function(err){
      console.log("submook passoword", err)
    });

    cb();
  });

};



