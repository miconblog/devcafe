'use strict';

var express = require('express');
var setting = require('../../../app/controllers/setting.controller');
var ssr     = require('../../../app/server_side_render');
var router  = express.Router();

router.get('/', setting.index, ssr);
router.get('/member', setting.memberInfo, ssr);
router.get('/password', setting.password, ssr);
module.exports = router;
