/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/sequelize-instance');

module.exports = sequelize.define('read_user', {
  lastUpdateAt: {
    type: Sequelize.DATE
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