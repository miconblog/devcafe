'use strict';

var express = require('express');
var homeCtrl = require('./home.controller');
var userCtrl = require('../user/user.controller');
var router = express.Router();

router.get('/', homeCtrl.index);
router.get('/signin', homeCtrl.register);
router.post('/signin', userCtrl.create);

module.exports = router;
