/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/database/instance');

module.exports = sequelize.define('company', {
  
  id:  { 
    type: Sequelize.INTEGER(11).UNSIGNED, 
    primaryKey: true,
    autoIncrement: true 
  },

  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  
  domain: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'created_at'
  },

  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'updated_at'
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