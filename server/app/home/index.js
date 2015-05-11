'use strict';

var express = require('express');
var controller = require('./home.controller');
var router = express.Router();

router.get('/', controller.index);
router.get('/signin', controller.register);


module.exports = router;
