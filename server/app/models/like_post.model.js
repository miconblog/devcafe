/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/database/instance');

module.exports = sequelize.define('like_post', {
  
  memberId: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    field: 'member_id'
  },

  postId: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    field: 'post_id'
  },

  lastUpdatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    field: 'last_updated_at'
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