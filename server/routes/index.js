'use strict';

var auth = require('../app/services/auth.service');

module.exports = function(app) {
  app.use('/boards', auth.isAuthenticated(), require('./board'));
  app.use('/account', auth.isAuthenticated(), require('./account'));
  app.use('/admin', auth.isAuthenticated(), require('./admin'));
  app.use('/api', require('./api'));
  app.use('/', require('./home'));
};