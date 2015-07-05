/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */
'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/database/instance');

module.exports = sequelize.define('comment', {
  
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  username: {
     type: Sequelize.STRING
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

