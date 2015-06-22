'use strict';

module.exports = function(app) {

  app.use('/companys', require('./app/company'));
  app.use('/members', require('./app/member'));
  app.use('/boards', require('./app/board'));
  app.use('/settings', require('./app/setting'));
  app.use('/admin', require('./app/admin'));
  app.use('/api', require('./api'));
  app.use('/', require('./app/home'));
  
};