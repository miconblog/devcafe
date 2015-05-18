'use strict';

module.exports = function(app) {

  app.use('/members', require('./app/member'));
  app.use('/boards', require('./app/board'));
  app.use('/boards/:id', require('./app/post'));
  app.use('/', require('./app/home'));
  
};