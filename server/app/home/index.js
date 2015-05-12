'use strict';

var express = require('express');
var homeCtrl = require('./home.controller');
var userCtrl = require('../user/user.controller');
var router = express.Router();

router.get('/', homeCtrl.index);
router.get('/signin', homeCtrl.signin);
router.get('/signup', homeCtrl.signup);
router.get('/signout', homeCtrl.signout);

router.post('/signin', userCtrl.authenticate);
router.post('/signup', userCtrl.create);

module.exports = router;
