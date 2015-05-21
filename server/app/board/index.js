'use strict';

var express = require('express');
var controller = require('./board.controller');
var auth = require('../../libs/auth.service');
var router = express.Router();

router.get('/', auth.isAuthenticated, controller.index);
router.get('/:boardId', auth.isAuthenticated, controller.show);

module.exports = router;
