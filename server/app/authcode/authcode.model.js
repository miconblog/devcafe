/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/database/instance');

module.exports = sequelize.define('authcode', {
  
  email: {
    type: Sequelize.STRING(80),
    primaryKey: true
  },
  code: {
    type: Sequelize.STRING(32),
    unique: true,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false
  },
  expired_at: {
    type: Sequelize.DATE,
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
  timestamps: false,
  freezeTableName: true // Model tableName will be the same as the model name
});