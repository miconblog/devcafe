'use strict';

var express = require('express');
var home    = require('../../app/controllers/home.controller');
var auth    = require('../../app/services/auth.service');
var ssr     = require('../../app/server_side_render');
var router  = express.Router();

router.use('/settings', require('./setting'));
router.get('/resetPassword', home.resetPassword, ssr);

module.exports = router;