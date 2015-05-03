/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';

var User = require('./user.model');
var renderReact = require('../../libs/render-react');

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {


  User.find({
    where: {id: 1},
    //attributes: ['id', 'username', 'email']
  }).then(function (user) {

    // 패스워드 변경 예제
    console.log(" authenticate:  ", user.authenticate('1234'))
    if(user.authenticate('1234')) {
      user.password = '1111';
      user.save().then(function(user) {

        console.log(user.get({plain:true}))
        
      });
    } 


  });


  User.findAll().then(function (users) {
   
    // var collection = [];

    // users.forEach(function(user){
    //   collection.push(user.get({plain: true}))
    // });

    res.render('home', renderReact({
      title: 'Express User',
      path : 'users',
      users: users
    }));

  });
};
