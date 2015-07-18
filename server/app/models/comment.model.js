/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */
'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/database/instance');

module.exports = sequelize.define('comment', {

  id:  { 
    type: Sequelize.INTEGER(11).UNSIGNED, 
    primaryKey: true,
    autoIncrement: true 
  },
  
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  username: {
     type: Sequelize.STRING
  },

  memberId: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: false,
    field: 'member_id'
  },

  postId: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: false,
    field: 'post_id'
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

