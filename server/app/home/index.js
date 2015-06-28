'use strict';

var express = require('express');
var home = require('./home.controller');
var member = require('../member/member.controller');
var authcodeCtrl = require('../authcode/authcode.controller');
var auth = require('../../libs/service/auth.service');
var renderReact = require('../../libs/render-react');
var router = express.Router();

router.get('/', home.index, renderReact);
router.get('/signin', home.signin, renderReact);
router.get('/signup', home.signup, renderReact);
router.get('/signout', home.signout);

router.post('/signin', member.authenticate, renderReact);
router.post('/signup', member.validate, member.makeAuthCode, member.create, renderReact);

router.get('/confirm', authcodeCtrl.confirm, renderReact);
router.get('/resetPassword', auth.isAuthenticated(), member.resetPassword, renderReact);
router.get('/sendResetPassword', member.sendResetPasswordForm, renderReact);
router.post('/sendResetPassword', member.sendResetPasswordPost, renderReact);

module.exports = router;
