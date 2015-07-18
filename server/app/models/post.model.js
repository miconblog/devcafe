/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/database/instance');

module.exports = sequelize.define('post', {

  id:  { 
    type: Sequelize.INTEGER(11).UNSIGNED, 
    primaryKey: true,
    autoIncrement: true 
  },

  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  boardId: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: false,
    field: 'board_id'
  },

  memberId: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: false,
    field: 'member_id'
  },

  username: { 
    // 사용자가 탈퇴해도 해당 글을 직접 지우지 않으면 이름은 남아 있어야한다.
    type: Sequelize.STRING,
    allowNull: false
  },

  readCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    field: 'read_count'
  },
  
  likeCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    field: 'like_count'
  },

  commentCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    field: 'comment_count'
  },

  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    field: 'deleted_yn'
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
  timestamps: false,
  underscored: true,
  freezeTableName: true // Model tableName will be the same as the model name
});