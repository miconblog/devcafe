'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/sequelize-instance');

module.exports = sequelize.define('board', {
  
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

