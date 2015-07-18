/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/database/instance');

module.exports = sequelize.define('authentication_code', {
  
  email: {
    type: Sequelize.STRING(80),
    primaryKey: true
  },

  code: {
    type: Sequelize.STRING(32),
    unique: true,
    allowNull: false
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'created_at'
  },

  expiredAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'expired_at'
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
  underscored: true,
  timestamps: false,
  freezeTableName: true // Model tableName will be the same as the model name
});