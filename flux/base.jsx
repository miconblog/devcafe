var React = require('react');

var Fluxxor = require('fluxxor');
var actions = require('./actionCreator');
var TodoStore = require('./stores/TodoStore');
var CommentStore = require('./stores/CommentStore');

// 사용할 스토어
var stores = {
  TodoStore: new TodoStore(),
  CommentStore: new CommentStore()
};


var fluxxor = new Fluxxor.Flux(stores, actions.methods);
fluxxor.on('dispatch', function(type, payload) {

  if( console && console.log ){

    console.log("[Dispatch]", type, payload);

  }
});

var props = JSON.parse(document.getElementById("props").innerHTML);
props.flux = fluxxor;

window.React = React;
window.DevCafe = {
  moment: require('moment'),
  loaded_locale: require('moment/locale/ko'),
  Home: React.createFactory(require('./components/pages/Home.jsx')),
  Settings: React.createFactory(require('./components/pages/Settings.jsx')),
  ResetPass: React.createFactory(require('./components/pages/ResetPass.jsx')),
  PostMain: React.createFactory(require('./components/pages/PostMain.jsx')),
  Admin: React.createFactory(require('./components/pages/Admin.jsx')),
  props: props
}