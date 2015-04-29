'use strict';

module.exports = function(app) {

  app.use('/users', require('./app/user'));

  /* GET home page. */
  app.get('/', function(req, res, next) {

    req.syncProps = {
      title: 'Express!!',
      path: 'home'
    }

    next();

  });
  
};