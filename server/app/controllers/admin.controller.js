'use strict';
var Company = require('../models/company.model');
var Member  = require('../models/member.model');
var Board   = require('../models/board.model');

Member.belongsTo(Company, {foreignKey: 'companyId'});
exports.index = function(req, res, next) {

  Member.findAll({
    include: [ { model: Company, as: 'company' } ],
  }).then(function(members){

    console.log(JSON.parse(JSON.stringify(members)));

    Board.all().then(function(boards){

      Company.all().then(function(companys){

        if( req.originalUrl === '/admin' ){
          res.locals.modeAdmin = true;  
        }

        req.react = {
          component : 'Admin',
          props: {
            boards: JSON.parse(JSON.stringify(boards)),
            members: JSON.parse(JSON.stringify(members)),
            companys: JSON.parse(JSON.stringify(companys))
          }
        }
        next();

      });

    });

  });
  
};
