'use strict';

module.exports = function(app) {

  app.use('/members', require('./app/member'));
  app.use('/boards', require('./app/board'));
  app.use('/', require('./app/home'));
  
};