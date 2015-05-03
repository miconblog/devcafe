/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';

var Post = require('./post.model');
var renderReact = require('../../libs/render-react');

exports.index = function(req, res) {


  Post.findAll().then(function (posts) {

    res.render('board', renderReact({
      title: 'Express Board',
      path: 'posts',
      posts: posts
    }));


  });
};
