'use strict';

var express = require('express');
var boardCtrl = require('./board.controller');
var auth = require('../../libs/auth.service');
var router = express.Router();

router.get('/', auth.isAuthenticated, boardCtrl.index);
router.get('/:boardId', auth.isAuthenticated, boardCtrl.canAccess, boardCtrl.postlist);
router.get('/:boardId/:postId', auth.isAuthenticated, boardCtrl.canAccess, boardCtrl.postdetail);

module.exports = router;
