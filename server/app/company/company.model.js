/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/sequelize-instance');

module.exports = sequelize.define('company', {
  
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  domain1: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  domain2: {
    type: Sequelize.STRING,
    unique: true
  },
  memberCount: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    defaultValue: 0
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