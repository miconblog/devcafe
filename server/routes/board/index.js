'use strict';

var express = require('express');
var board   = require('../../app/controllers/board.controller');
var post    = require('../../app/controllers/post.controller');
var auth    = require('../../app/services/auth.service');
var ssr     = require('../../app/server_side_render');
var router  = express.Router();

router.get(   '/:boardId/newpost', auth.isAuthenticated(), board.canAccess, post.form, ssr);
router.get(   '/:boardId/:postId', auth.isAuthenticated(), board.canAccess, post.canAccess, post.show, ssr);
router.get(   '/:boardId/:postId/edit', auth.isAuthenticated(), board.canAccess, post.canAccess, post.edit, ssr);
router.post(  '/:boardId/:postId/comment', auth.isAuthenticated(), board.canAccess, post.canAccess, post.createComment, ssr);
router.delete(  '/:boardId/:postId/comment/:commentId', auth.isAuthenticated(), board.canAccess, post.canAccess, post.deleteComment, ssr);
router.get(   '/:boardId', auth.isAuthenticated(), board.canAccess, post.list, ssr);

router.post(  '/:boardId', auth.isAuthenticated(), board.canAccess, post.create);
router.delete('/:boardId/:postId', auth.isAuthenticated(), board.canAccess, post.canAccess, post.delete);
router.put(   '/:boardId/:postId', auth.isAuthenticated(), board.canAccess, post.canAccess, post.update);

//router.get(   '/', auth.isAuthenticated(), board.index);

module.exports = router;
