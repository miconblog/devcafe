/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';

var Board = require('./board.model');
var renderReact = require('../../libs/render-react');
var React = require('react'),
    App = React.createFactory(require('../../../flux/components/App.jsx'));


exports.index = function(req, res) {


  Board.findAll().then(function (boards) {

    res.render('board', renderReact(App, {
      title: 'Express Board',
      path: 'boards',
      boards: boards
    }));

  });
};
