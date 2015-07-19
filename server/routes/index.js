'use strict';

var auth  = require('../app/services/auth.service');
var board = require('../app/controllers/board.controller');

module.exports = function(app) {
  app.use('/boards', auth.isAuthenticated(), board.canAccess, require('./board'));
  app.use('/account', auth.isAuthenticated(), require('./account'));
  app.use('/admin', auth.isAuthenticated(), require('./admin'));
  app.use('/api', require('./api'));
  app.use('/', require('./home'));
};