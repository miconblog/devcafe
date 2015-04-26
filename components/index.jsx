const React = require('react');
const ReactComponent = React.createFactory(require('./ReactComponent.jsx'));

var props = JSON.parse(document.getElementById("props").innerHTML);

React.render(ReactComponent(props), document.getElementById('main'));
