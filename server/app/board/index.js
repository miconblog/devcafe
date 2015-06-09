'use strict';

var express   = require('express');
var boardCtrl = require('../board/board.controller');
var postCtrl  = require('../post/post.controller');
var auth      = require('../../libs/auth.service');
var renderReact = require('../../libs/render-react');
var router    = express.Router();

router.get(   '/:boardId/newpost', auth.isAuthenticated(), boardCtrl.canAccess, postCtrl.form, renderReact);
router.get(   '/:boardId/:postId', auth.isAuthenticated(), boardCtrl.canAccess, postCtrl.canAccess, postCtrl.show, renderReact);
router.get(   '/:boardId/:postId/edit', auth.isAuthenticated(), boardCtrl.canAccess, postCtrl.canAccess, postCtrl.edit, renderReact);
router.get(   '/:boardId', auth.isAuthenticated(), boardCtrl.canAccess, postCtrl.list, renderReact);

router.post(  '/:boardId', auth.isAuthenticated(), boardCtrl.canAccess, postCtrl.create);
router.delete('/:boardId/:postId', auth.isAuthenticated(), boardCtrl.canAccess, postCtrl.canAccess, postCtrl.delete);
router.put(   '/:boardId/:postId', auth.isAuthenticated(), boardCtrl.canAccess, postCtrl.canAccess, postCtrl.update);

//router.get(   '/', auth.isAuthenticated(), boardCtrl.index);

module.exports = router;
