/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */
'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/sequelize-instance');

module.exports = sequelize.define('board', {
  
  id: {
    type: Sequelize.STRING(20),
    primaryKey: true
  },

  name: {
    type: Sequelize.STRING
  },

  // 게시판 유형, N-일반, C-회사, L-시간제한
  type: {
    type: Sequelize.ENUM('N', 'C', 'L'),
    allowNull: false,
  },

  openAt: {
    type: Sequelize.DATE
  },

  closeAt: {
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

  freezeTableName: true // Model tableName will be the same as the model name
});

