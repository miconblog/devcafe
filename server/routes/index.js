'use strict';

module.exports = function(app) {
  app.use('/boards', require('./board'));
  app.use('/account', require('./account'));
  app.use('/admin', require('./admin'));
  app.use('/api', require('./api'));
  app.use('/', require('./home'));
};