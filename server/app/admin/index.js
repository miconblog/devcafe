'use strict';

var express = require('express');
var homeCtrl = require('./admin.controller');
var memberCtrl = require('../member/member.controller');
var auth = require('../../libs/auth.service');
var router = express.Router();

router.get('/', homeCtrl.index);

module.exports = router;
