var React = require('react');

var Fluxxor = require('fluxxor');
var actions = require('./ActionCreator').methods;
var TodoStore = require('./stores/TodoStore');

// 사용할 스토어
var stores = {
  TodoStore: new TodoStore()
};


var fluxxor = new Fluxxor.Flux(stores, actions);
fluxxor.on('dispatch', function(type, payload) {

  if( console && console.log ){

    console.log("[Dispatch]", type, payload);

  }
});

var props = JSON.parse(document.getElementById("props").innerHTML);
props.flux = fluxxor;

window.React = React;
window.DevCafe = {
  Home: React.createFactory(require('./components/Home.jsx')),
  Admin: React.createFactory(require('./components/Admin.jsx')),
  BoardList: React.createFactory(require('./components/BoardList.jsx')),
  UserList: React.createFactory(require('./components/UserList.jsx')),
  props: props
}