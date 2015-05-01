/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/sequelize-instance');

var Board = sequelize.define('board', {
  
  name: {
    type: Sequelize.STRING,
    unique: true
  }

}, {

  getterMethods: {

  },
  setterMethods: {
    
  },
  
  classMethods: {

  },

  instanceMethods: {

  },

  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Board;