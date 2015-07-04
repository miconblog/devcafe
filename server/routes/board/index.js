'use strict';

var express = require('express');
var board   = require('../../app/controllers/board.controller');
var post    = require('../../app/controllers/post.controller');
var ssr     = require('../../app/server_side_render');
var router  = express.Router();

router.get(   '/:boardId/newpost', board.canAccess, post.form, ssr);
router.get(   '/:boardId/:postId', board.canAccess, post.canAccess, post.show, ssr);
router.get(   '/:boardId/:postId/edit', board.canAccess, post.canAccess, post.edit, ssr);
router.post(  '/:boardId/:postId/comment', board.canAccess, post.canAccess, post.createComment, ssr);
router.delete(  '/:boardId/:postId/comment/:commentId', board.canAccess, post.canAccess, post.deleteComment, ssr);
router.get(   '/:boardId', board.canAccess, post.list, ssr);

router.post(  '/:boardId', board.canAccess, post.create);
router.delete('/:boardId/:postId', board.canAccess, post.canAccess, post.delete);
router.put(   '/:boardId/:postId', board.canAccess, post.canAccess, post.update);

//router.get(   '/', auth.isAuthenticated(), board.index);

module.exports = router;
