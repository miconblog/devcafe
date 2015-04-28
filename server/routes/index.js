var express = require('express');
var router = express.Router();

var JSX = require('node-jsx').install({extension: '.jsx', harmony: true}),
    React = require('react'),
    App = React.createFactory(require('../../flux/components/App.jsx'));

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var syncProps = {
    title: 'Express!!!'
  }

  var markup = React.renderToString(
    App(syncProps)
  );

  res.render('home', { 
    markup: markup,
    props : safeStringify(syncProps)
  });

});

module.exports = router;
