/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */
'use strict';

var Board = require('./board.model');
var renderReact = require('../../libs/render-react');
var React = require('react'),
    BoardList = React.createFactory(require('../../../flux/components/BoardList.jsx'));


exports.index = function(req, res) {


  Board.findAll().then(function (boards) {

    res.render('board', renderReact(BoardList, {
      title: 'Express Board',
      path: 'boards',
      boards: boards
    }));

  });
};
