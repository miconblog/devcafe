/**
 * 모델 문서 참고
 * http://docs.sequelizejs.com/en/1.7.0/docs/models/#models
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/sequelize-instance');

module.exports = sequelize.define('post', {
  
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
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