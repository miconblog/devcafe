/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/lastest/docs/models-usage
 */

'use strict';
var Company = require('../company/company.model');
var Member = require('../member/member.model');
var Board = require('../board/board.model');

exports.index = function(req, res, next) {


  Member.all().then(function(members){

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
