'use strict';

var express  = require('express');
var home     = require('../../app/controllers/home.controller');
var member   = require('../../app/controllers/member.controller');
var authcode = require('../../app/controllers/authcode.controller');
var auth     = require('../../app/services/auth.service');
var ssr      = require('../../app/server_side_render');
var router   = express.Router();

router.get('/', home.index, ssr);
router.post('/', member.singin, home.index, ssr);

router.get('/signup', home.signup, ssr);
router.post('/signup', member.validate, member.create, authcode.make, /*member.sendMail,*/ home.signup, ssr);

router.get('/signout', home.signout);
router.get('/confirm', authcode.confirm, ssr);

router.get('/findPassword', home.findPassword, ssr);
router.post('/findPassword', member.sendResetPassword, home.findPassword, ssr);

module.exports = router;
