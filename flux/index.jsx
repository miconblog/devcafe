var React = require('react');

window.React = React;
window.DevCafe = {
  Home: React.createFactory(require('./components/Home.jsx')),
  Board: React.createFactory(require('./components/Board.jsx')),
  UserList: React.createFactory(require('./components/UserList.jsx')),
  props: JSON.parse(document.getElementById("props").innerHTML)
}