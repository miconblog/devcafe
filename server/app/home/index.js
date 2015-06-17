'use strict';

var express = require('express');
var homeCtrl = require('./home.controller');
var memberCtrl = require('../member/member.controller');
var authcodeCtrl = require('../authcode/authcode.controller');
var auth = require('../../libs/service/auth.service');
var renderReact = require('../../libs/render-react');
var router = express.Router();

router.get('/', homeCtrl.index, renderReact);
router.get('/signin', homeCtrl.signin, renderReact);
router.get('/signup', homeCtrl.signup, renderReact);
router.get('/signout', homeCtrl.signout);

router.post('/signin', memberCtrl.authenticate, renderReact);
router.post('/signup', auth.validateForm(), auth.createCode(), memberCtrl.create, renderReact);

router.get('/confirm', authcodeCtrl.confirm, renderReact);
router.get('/resetPassword', auth.isAuthenticated(), memberCtrl.resetPassword, renderReact);

module.exports = router;
