/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/database/instance');

module.exports = sequelize.define('post', {

  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  username: { 
    // 사용자가 탈퇴해도 해당 글을 직접 지우지 않으면 이름은 남아 있어야한다.
    type: Sequelize.STRING,
    allowNull: false
  },
  readCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  likeCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  commentCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
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