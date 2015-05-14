'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../libs/auth.service');
var router = express.Router();

router.get('/', auth.isAuthenticated,/*auth.hasRole('admin'),*/ controller.index);
// router.delete('/:id', auth.hasRole('admin'), controller.destroy);
// router.get('/me', auth.isAuthenticated(), controller.me);
// router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
// router.get('/:id', auth.isAuthenticated(), controller.show);
// router.post('/', controller.create);

module.exports = router;
