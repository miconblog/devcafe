'use strict';

var express  = require('express');
var home     = require('../../app/controllers/home.controller');
var member   = require('../../app/controllers/member.controller');
var authcode = require('../../app/controllers/authcode.controller');
var auth     = require('../../app/services/auth.service');
var ssr      = require('../../app/server_side_render');
var router   = express.Router();

router.get('/', home.index, ssr);

router.get('/signup', home.signup, ssr);
router.get('/signout', home.signout);

router.post('/signin', member.authenticate, ssr);
router.post('/signup', member.validate, member.makeAuthCode, member.create, ssr);

router.get('/confirm', authcode.confirm, ssr);
router.get('/resetPassword', auth.isAuthenticated(), member.resetPassword, ssr);
router.get('/sendResetPassword', member.sendResetPasswordForm, ssr);
router.post('/sendResetPassword', member.sendResetPasswordPost, ssr);

module.exports = router;
