'use strict';

module.exports = function(app) {

  app.use('/users', require('./app/user'));
  app.use('/boards', require('./app/board'));
  app.use('/boards/:id', require('./app/post'));
  app.use('/', require('./app/home'));
  
};