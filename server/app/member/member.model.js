/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */

'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/database/instance');
var crypto = require('crypto');

var Member = sequelize.define('member', {
  
  name: {
    type: Sequelize.STRING
  },

  hashedPassword: {
    type: Sequelize.STRING
  },

  salt: {
    type: Sequelize.STRING
  },

  authData: {
    type: Sequelize.TEXT
  },

  role: {
    type: Sequelize.STRING,
    defaultValue: 'user'
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },

  shouldResetPassword: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },

  emailVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }

}, {

  getterMethods: {
    //password : function()  { return this.hashedPassword }
  },
  setterMethods: {
    password: function(password) { 
      this.salt = Member.makeSalt();
      this.setDataValue('hashedPassword', Member.encryptPassword(password, this.salt));
    },
  },
  
  classMethods: {
    
    makeSalt: function() {
      return crypto.randomBytes(16).toString('base64');
    }, 

    encryptPassword: function(password, salt) {
      if (!password || !salt) return '';
      
      salt = new Buffer(salt, 'base64');
      
      return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    },   
  },

  instanceMethods: {

    
    authenticate: function(plainText) {
      return Member.encryptPassword(plainText, this.salt) === this.hashedPassword;
    },

  },

  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Member;