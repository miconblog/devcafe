/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/sequelize-instance');

module.exports = sequelize.define('post', {

  boardId: {
    // 게시판을 삭제하면 관련 글도 모두 지워야한다.
    type: Sequelize.INTEGER,
    references: "Board",
    referencesKey: "id",
    allowNull: false
  },
  writerId: {
    // 사용자가 탈퇴하면 ID는 NULL 되어야한다.
    type: Sequelize.INTEGER,
    allowNull: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  writer: { 
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