'use strict';

var express = require('express');
var router = express.Router();
var Company = require('../../app/company/company.model')
// var crypto = require('crypto');
// var moment = require('moment');
// var auth = require('../../libs/service/auth.service');

router.get('/', /*auth.isAuthenticated(), */ function(req, res){
  if (req.query.name === '') {
    return res.json([]);
  }


  Company
  .findAll({ where: {
    name: {
      $like: '%'+req.query.name+'%'
    }
  }})
  .then(function(company) {
    res.json(company);
  });

});

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

router.put('/', /*auth.isAuthenticated(), */ function(req, res){

  console.log(req.body);

  Company
  .find({where: {id: req.body.id}})
  .then(function(company) {

    company.name = req.body.name;
    company.domain = req.body.domain;
    company.updatedAt = new Date();
    company.save();
    res.json(company);
  });

});

router.delete('/:id', /*auth.isAuthenticated(), */ function(req, res){

  Company
  .find({where: {id: req.params.id}})
  .then(function(company) {
    company.destroy();
    res.json(company);
  });

});

module.exports = router;