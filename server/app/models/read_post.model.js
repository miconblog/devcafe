/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/database/instance');

module.exports = sequelize.define('read_post', {
  lastUpdateAt: {
    type: Sequelize.DATE
  },
  memberId: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  },
  postId: {
    type: Sequelize.INTEGER(11),
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