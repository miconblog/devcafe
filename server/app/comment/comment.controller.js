/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';

var Comment = require('./comment.model');
var renderReact = require('../../libs/render-react');

exports.index = function(req, res) {


  Comment.findAll().then(function (comments) {

    res.render('comment', renderReact({
      title: 'Express Comment',
      path: 'comments',
      comments: comments
    }));

  });
};
