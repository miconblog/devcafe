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

module.exports = router;