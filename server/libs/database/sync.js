'use strict';
var Member      = require('../../app/models/member.model');
var Board       = require('../../app/models/board.model');
var Post        = require('../../app/models/post.model');
var Comment     = require('../../app/models/comment.model');
var Company     = require('../../app/models/company.model');
var ReadPost    = require('../../app/models/read_post.model');
var LikePost    = require('../../app/models/like_post.model');
var AuthCode    = require('../../app/models/authcode.model');
var DBRelations = require('./relations');

var Q = require('q');
    Q.longStackSupport = true;
    DBRelations();

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

function syncAllTables(opt){
  var deferred = Q.defer();

  AuthCode.sync(opt);
  ReadPost.sync(opt);
  LikePost.sync(opt);
  Company.sync(opt).then(function(){
    Member.sync(opt).then(function(){
      Board.sync(opt).then(function(){
        Post.sync(opt).then(function(){
          Comment.sync(opt).then(function(){

            console.log("\n----------- sync all tables ------------ \n\n")
            deferred.resolve();
          })
        })
      })
    })
  })
  return deferred.promise;
}

module.exports = function(opt){
  var deferred = Q.defer();

  opt = opt || {force:false}

  // 기존 DB 삭제
  dropAllTables().then(function(){
    syncAllTables(opt).then(function(){
      deferred.resolve();
    });
  });

  return deferred.promise;
};



