var express = require('express');
var router = express.Router();

var JSX = require('node-jsx').install({extension: '.jsx', harmony: true}),
    React = require('react'),
    ReactComponent = React.createFactory(require('../../components/ReactComponent.jsx'));

/* GET home page. */
router.get('/', function(req, res, next) {

  var content = React.renderToString(ReactComponent());

  console.log(" ===> ", content);

  res.render('home', { title: 'Express', react_content: content });
});

module.exports = router;
