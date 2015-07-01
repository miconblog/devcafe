'use strict';

var express = require('express');
var Company = require('../../../app/models/company.model');
var Member  = require('../../../app/models/member.model');
var router  = express.Router();

// var crypto = require('crypto');
// var moment = require('moment');

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
    console.log(created);

    // 회사가 등록됐으니까 같은 도메인을 가진 회원들을 다 찾아서 CompanyId를 설정해준다.
    Member
    .findAll({
      where: {
        companyId: null,
        email: {
          $like: '%@' + req.body.domain
        }
      }
    })
    .then(function(members){

      members.forEach(function(member){

        member.companyId = company.id;
        member.save();
      });

    });



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