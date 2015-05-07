/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';

var Comment = require('./comment.model');
var renderReact = require('../../libs/render-react');
var React = require('react'),
    App = React.createFactory(require('../../../flux/components/App.jsx'));

exports.index = function(req, res) {


  Comment.findAll().then(function (comments) {

    res.render('comment', renderReact(App, {
      title: 'Express Comment',
      path: 'comments',
      comments: comments
    }));

  });
};
