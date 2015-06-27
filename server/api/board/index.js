'use strict';

var express = require('express');
var router = express.Router();
var Board = require('../../app/board/board.model')
// var crypto = require('crypto');
// var moment = require('moment');
// var auth = require('../../libs/service/auth.service');

router.get('/', /*auth.isAuthenticated(), */ function(req, res){
  if (req.query.q === '') {
    return res.json([]);
  }

  Board
  .findAll({ where: { id: req.query.q }})
  .then(function(company) {
    res.json(company);
  });

});

router.post('/', /*auth.isAuthenticated(), */ function(req, res){

  Board
  .findOrCreate({
    where: {id: req.body.id}, 
    defaults: {id: req.body.id, name: req.body.name, type: req.body.boardType, companyId: req.body.companyId}
  })
  .spread(function(company, created) {
    console.log(company.get({
      plain: true
    }))
    console.log(created)

    res.json(company);
  });

});

router.delete('/:id', /*auth.isAuthenticated(), */ function(req, res){

  Board
  .findOne({
    where: {id: req.params.id}
  })
  .then(function(board) {
    board.destroy();
    res.json(board);
  });

});

module.exports = router;