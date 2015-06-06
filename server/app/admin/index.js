'use strict';

var express = require('express');
var adminCtrl = require('./admin.controller');
var memberCtrl = require('../member/member.controller');
var auth = require('../../libs/auth.service');
var router = express.Router();

router.get('/', auth.isAuthenticated(), auth.hasRole('admin'), adminCtrl.index);

module.exports = router;
