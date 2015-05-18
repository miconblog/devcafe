/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';

var Post = require('./post.model');
var renderReact = require('../../libs/render-react');
var React = require('react'),
    BoardList = React.createFactory(require('../../../flux/components/BoardList.jsx'));

exports.index = function(req, res) {

  Post.findAll().then(function (posts) {
    res.render('board', renderReact(BoardList, {
      title: 'Express Post List',
      path: 'posts',
      posts: posts
    }));


  });
};

exports.detail = function(req, res) {

  Post.findAll().then(function (posts) {

    res.render('board', renderReact(BoardList, {
      title: 'Express Post Detail',
      path: 'posts',
      posts: posts
    }));


  });
};
