'use strict';

var _ = require('lodash');
var React = require('react');
var Fluxxor = require('fluxxor');
var actions = require('../../flux/actions/ActionCreator').methods;
var TodoStore = require('../../flux/stores/TodoStore');

// 사용할 스토어
var stores = {
  TodoStore: new TodoStore()
};

var fluxxor = new Fluxxor.Flux(stores, actions);

   
function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

module.exports = function(Compoment, props){

  var propsWithFlux = _.extend({flux: fluxxor}, props);
  var markup = React.renderToString(Compoment(propsWithFlux));

  return {
    markup: markup,
    props : safeStringify(props)
  };

}