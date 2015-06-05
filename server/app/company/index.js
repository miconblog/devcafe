/**
 * TODO: 
 * composable-middleware 를 사용해 auth.hasRole('admin') 같은 기능이 동작하도록 재작성이 필요.
 * auth.hasRole은 isAuthericated() 를 먼저 실행한다.
 */

'use strict';

var express = require('express');
var controller = require('./company.controller');
var auth = require('../../libs/auth.service');
var router = express.Router();

router.get('/', auth.isAuthenticated(),/*auth.hasRole('admin'),*/ controller.index);
// router.delete('/:id', auth.hasRole('admin'), controller.destroy);
// router.get('/me', auth.isAuthenticated(), controller.me);
// router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
// router.get('/:id', auth.isAuthenticated(), controller.show);
// router.post('/', controller.create);

module.exports = router;
