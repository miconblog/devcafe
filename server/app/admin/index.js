'use strict';

var express = require('express');
var adminCtrl = require('./admin.controller');
var memberCtrl = require('../member/member.controller');
var auth = require('../../libs/service/auth.service');
var renderReact = require('../../libs/render-react');
var router = express.Router();

router.get('/', auth.isAuthenticated(), auth.hasRole('admin'), adminCtrl.index, renderReact);

module.exports = router;
