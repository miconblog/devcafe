const React = require('react');
const App = React.createFactory(require('./components/App.jsx'));

var props = JSON.parse(document.getElementById("props").innerHTML);

React.render( App(props), document.getElementById('main') );
