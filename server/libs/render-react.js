'use strict';

var _ = require('lodash');
var React = require('react');
var Fluxxor = require('fluxxor');
var RootComs = {
  'Admin'     : React.createFactory(require('../../flux/components/pages/Admin.jsx')),
  'Home'      : React.createFactory(require('../../flux/components/pages/Home.jsx')),
  'PostMain'  : React.createFactory(require('../../flux/components/pages/PostMain.jsx')),
  'ResetPass' : React.createFactory(require('../../flux/components/pages/ResetPass.jsx')),
  'Settings' : React.createFactory(require('../../flux/components/pages/Settings.jsx')),
};
var actions = require('../../flux/actionCreator').methods;
var TodoStore = require('../../flux/stores/TodoStore');
var CommentStore = require('../../flux/stores/CommentStore');

// 사용할 스토어
var stores = {
  TodoStore: new TodoStore(),
  CommentStore: new CommentStore()
};

var fluxxor = new Fluxxor.Flux(stores, actions);

   
function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

module.exports = function(req, res){

  var component = RootComs[req.react.component];
  var propsWithFlux = _.extend({flux: fluxxor}, req.react.props);
  var markup = React.renderToString(component(propsWithFlux));

  console.log("locals ==> ", res.locals);
  res.render('home', {
    markup: markup,
    component: req.react.component,
    props : safeStringify(req.react.props)
  });
};