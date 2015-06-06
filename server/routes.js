'use strict';

module.exports = function(app) {

  app.use('/companys', require('./app/company'));
  app.use('/members', require('./app/member'));
  app.use('/boards', require('./app/board'));
  app.use('/admin', require('./app/admin'));
  app.use('/', require('./app/home'));
  
};