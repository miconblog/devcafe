'use strict';

var express = require('express');
var homeCtrl = require('./home.controller');
var memberCtrl = require('../member/member.controller');
var authcodeCtrl = require('../authcode/authcode.controller');
var auth = require('../../libs/auth.service');
var router = express.Router();

router.get('/', homeCtrl.index);
router.get('/signin', homeCtrl.signin);
router.get('/signup', homeCtrl.signup);
router.get('/signout', homeCtrl.signout);

router.post('/signin', memberCtrl.authenticate);
router.post('/signup', memberCtrl.create);

router.get('/confirm', authcodeCtrl.confirm);
router.get('/resetPassword', auth.isAuthenticated(), memberCtrl.resetPassword);

module.exports = router;
