'use strict';

var express = require('express');
var router = express.Router();

router.use('/comments', require('./comment'));
router.use('/companys', require('./company'));
router.use('/members', require('./member'));
router.use('/boards', require('./board'));
module.exports = router;

