'use strict';

var JSX = require('node-jsx').install({extension: '.jsx', harmony: true}),
    React = require('react'),
    App = React.createFactory(require('../../flux/components/App.jsx'));

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

module.exports = function(props){
  
  var markup = React.renderToString(
    App(props)
  );
  
  return {
    markup: markup ,
    props : safeStringify(props)
  }

}