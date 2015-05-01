'use strict';

module.exports = function(app) {

  app.use('/users', require('./app/user'));
  app.use('/boards', require('./app/board'));

  /* GET home page. */
  app.get('/', function(req, res, next) {

    req.syncProps = {
      title: 'Express!!',
      path: 'home'
    }

    next();

  });
  
};