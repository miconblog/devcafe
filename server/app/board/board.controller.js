/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';

var Board = require('./board.model');
var renderReact = require('../../libs/render-react');
var React = require('react'),
    BoardHome = React.createFactory(require('../../../flux/components/Board.jsx'));


exports.index = function(req, res) {


  Board.findAll().then(function (boards) {

    res.render('board', renderReact(BoardHome, {
      title: 'Express Board',
      path: 'boards',
      boards: boards
    }));

  });
};
