'use strict';

var express = require('express');
var settingCtrl = require('../setting/setting.controller');
var auth = require('../../libs/auth.service');
var renderReact = require('../../libs/render-react');
var router = express.Router();

router.get('/', auth.isAuthenticated(), settingCtrl.index, renderReact);
router.get('/member', auth.isAuthenticated(), settingCtrl.memberInfo, renderReact);

module.exports = router;
