'use strict';

var express = require('express');
var router = express.Router();

router.use('/companys', require('./company'));  
module.exports = router;

