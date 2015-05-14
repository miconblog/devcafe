const React = require('react');
const Home = React.createFactory(require('./components/Home.jsx'));

var props = JSON.parse(document.getElementById("props").innerHTML);

React.render( Home(props), document.getElementById('main') );
