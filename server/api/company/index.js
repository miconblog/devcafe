/**
 * 2014 페이지 라우팅
 */
'use strict';

var express = require('express');
var router = express.Router();
var Company = require('../../app/company/company.model')
// var crypto = require('crypto');
// var moment = require('moment');
// var auth = require('../../libs/service/auth.service');

router.post('/', /*auth.isAuthenticated(), */ function(req, res){

  console.log(req.body);

  Company
  .findOrCreate({where: {name: req.body.name}, defaults: {name: req.body.name, domain: req.body.domain}})
  .spread(function(company, created) {
    console.log(company.get({
      plain: true
    }))
    console.log(created)

    res.json(company);
  });

});
module.exports = router;