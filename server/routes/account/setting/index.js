'use strict';

var express = require('express');
var setting = require('../../../app/controllers/setting.controller');
var auth    = require('../../../app/services/auth.service');
var ssr     = require('../../../app/server_side_render');
var router  = express.Router();

router.get('/', auth.isAuthenticated(), setting.index, ssr);
router.get('/member', auth.isAuthenticated(), setting.memberInfo, ssr);
router.get('/password', auth.isAuthenticated(), setting.password, ssr);
module.exports = router;
