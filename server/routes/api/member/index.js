'use strict';

var express = require('express');
var Member  = require('../../../app/models/member.model');
var router  = express.Router();

// var crypto = require('crypto');
// var moment = require('moment');
// var auth = require('../../libs/service/auth.service');

router.put('/:id', /*auth.isAuthenticated(), */ function(req, res){

  console.log(req.body);

  Member
  .find({where: {id: req.params.id}})
  .then(function(member) {
    member.role = req.body.role;
    member.updatedAt = new Date();
    member.save();
    res.json(member);
  });

});

router.put('/:id/password', /*auth.isAuthenticated(), */ function(req, res){

  console.log(req.body);

  Member
  .findOne({where:{id:req.params.id}})
  .then(function(member){

    member.password = req.body.password;
    member.shouldResetPassword = false;
    member.save().then(function(){
    
      res.json({result:'OK'});  

    });

  });
});

module.exports = router;