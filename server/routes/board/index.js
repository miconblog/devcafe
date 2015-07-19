'use strict';

var express = require('express');

var post    = require('../../app/controllers/post.controller');
var ssr     = require('../../app/server_side_render');
var router  = express.Router();

router.get( '/:boardId/write', post.writeForm, ssr);
router.get( '/:boardId/:postId', post.show, ssr);
router.get( '/:boardId/:postId/edit', post.edit, ssr);
router.get( '/:boardId', post.list, ssr);
router.post('/:boardId', post.create);

module.exports = router;
