'use strict';

var express = require('express');
var admin   = require('../../app/controllers/admin.controller');
var member  = require('../../app/controllers/member.controller');
var auth    = require('../../app/services/auth.service');
var ssr     = require('../../app/server_side_render');
var router  = express.Router();

router.get('/', auth.isAuthenticated(), auth.hasRole('admin'), admin.index, ssr);

module.exports = router;
