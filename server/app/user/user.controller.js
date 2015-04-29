/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';

var User = require('./user.model');

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res, next) {

  User.findAll().then(function (users) {
   

    console.log("===> ", users[0].get({plain: true}) );

    req.syncProps = {
      title: 'Express',
      path: 'home',
      users: users[0].get({plain: true})
    }

    next();

  });
};
