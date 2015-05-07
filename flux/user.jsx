const React = require('react');
const Component = React.createFactory(require('./components/UserList.jsx'));

var props = JSON.parse(document.getElementById("props").innerHTML);

React.render( Component(props), document.getElementById('main') );
