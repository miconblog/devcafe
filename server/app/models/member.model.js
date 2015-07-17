/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */
'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/database/instance');
var crypto = require('crypto');

var Member = sequelize.define('member', {
  
  id:  { 
    type: Sequelize.INTEGER(11).UNSIGNED, 
    primaryKey: true,
    autoIncrement: true 
  },

  name: {
    type: Sequelize.STRING
  },

  hashed_password: {
    type: Sequelize.STRING
  },

  salt: {
    type: Sequelize.STRING
  },

  role: {
    type: Sequelize.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user'
  },

  email: {
    type: Sequelize.STRING(80),
    unique: true,
    allowNull: false
  },

  should_reset_password: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },

  email_verified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  // 가입자 추이를 알아낼수있다.
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  
  // 마지막으로 수정한 패스워드 날짜를 알아낼수있다.
  last_modified_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  
  // 얼마나 많은 사용자가 실제 활동하고 있는지 알아낼수있다.  
  last_logged_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },

  // 사용자들의 접속한 지역을 확인할수있다.
  last_connected_ip: {
    type: Sequelize.STRING,
    validate : {
      isIP: true,
      isIPv4: true
    }
  }

}, {

  getterMethods: {
    shouldResetPassword : function()  { 
      return this.should_reset_password 
    },
    emailVerified : function()  { 
      return this.email_verified 
    }
  },
  setterMethods: {
    password: function(password) { 
      this.salt = Member.makeSalt();
      this.setDataValue('hashed_password', Member.encryptPassword(password, this.salt));
    },
    shouldResetPassword: function(value) { 
      this.setDataValue('should_reset_password', value);
    },
    emailVerified: function(value) { 
      this.setDataValue('email_verified', value);
    }
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
      return Member.encryptPassword(plainText, this.salt) === this.hashed_password;
    },

  },

  timestamps: false,
  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Member;