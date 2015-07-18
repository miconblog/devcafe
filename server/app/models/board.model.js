/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */
'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/database/instance');

module.exports = sequelize.define('board', {
  
  id: {
    type: Sequelize.STRING(20),
    primaryKey: true,
    allowNull: false
  },

  name: {
    type: Sequelize.STRING
  },

  /**
   * 게시판 유형 
   *  N-일반 - 모든 사람이 볼수있다.
   *  C-회사 - 회사에 소속된 사람들만 볼수있다. 
   *  T-시간제한 - 특정시간에 모든 사람들이 볼수있고 임시로 생성됐다 없어진다.
   *  R-생성요청 - 게시판 생성을 요청하는 곳이다.
   */
  type: {
    type: Sequelize.ENUM('N', 'C', 'T','R'),
    allowNull: false,
  },

  companyId: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    field: 'company_id'
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
  },

  openingAt: {
    type: Sequelize.DATE,
    field: 'opening_at'
  },

  closingAt: {
    type: Sequelize.DATE,
    field: 'closing_at'
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
  freezeTableName: true // Model tableName will be the same as the model name
});

