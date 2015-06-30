'use strict';

var express = require('express');
var router = express.Router();

router.use('/settings', require('./setting'));
module.exports = router;