/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';

var Board = require('./board.model');

exports.index = function(req, res, next) {


  Board.findAll().then(function (boards) {

    req.syncProps = {
      title: 'Express',
      path: 'boards',
      boards: JSON.parse(JSON.stringify(boards))
    }

    next();

  });
};
