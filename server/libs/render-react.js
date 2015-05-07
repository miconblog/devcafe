'use strict';

var React = require('react');
   
function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

module.exports = function(Compoment, props){

  var markup = React.renderToString(
    Compoment(props)
  );

  console.log(markup);
  
  return {
    markup: markup,
    props : safeStringify(props)
  }

}