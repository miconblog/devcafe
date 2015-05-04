'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/sequelize-instance');

module.exports = sequelize.define('comment', {
  
  writerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  content: {
    type: Sequelize.STRING,
    allowNull: false
  },

  writer: {
     type: Sequelize.STRING
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

