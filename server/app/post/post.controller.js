/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';

var Post = require('./post.model');
var renderReact = require('../../libs/render-react');
var React = require('react'),
    App = React.createFactory(require('../../../flux/components/App.jsx'));

exports.index = function(req, res) {

  Post.findAll().then(function (posts) {
    res.render('board', renderReact(App, {
      title: 'Express Post List',
      path: 'posts',
      posts: posts
    }));


  });
};

exports.detail = function(req, res) {

  Post.findAll().then(function (posts) {

    res.render('board', renderReact(App, {
      title: 'Express Post Detail',
      path: 'posts',
      posts: posts
    }));


  });
};
