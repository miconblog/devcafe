/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/database/instance');

module.exports = sequelize.define('company', {
  
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  
  domain: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
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