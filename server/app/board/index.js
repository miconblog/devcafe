'use strict';

var express = require('express');
var boardCtrl = require('./board.controller');
var auth = require('../../libs/auth.service');
var router = express.Router();

router.get('/', auth.isAuthenticated, boardCtrl.index);
router.get('/:boardId', auth.isAuthenticated, boardCtrl.canAccess, boardCtrl.show);

module.exports = router;
