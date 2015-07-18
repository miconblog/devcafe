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

  hashedPassword: {
    type: Sequelize.STRING,
    field: 'hashed_password'
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

  shouldResetPassword: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    field: 'should_reset_password'
  },

  emailVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    field: 'email_verified'
  },

  // 가입자 추이를 알아낼수있다.
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'created_at'
  },
  
  // 마지막으로 수정한 패스워드 날짜를 알아낼수있다.
  lastModifiedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'last_modified_at'
  },
  
  // 얼마나 많은 사용자가 실제 활동하고 있는지 알아낼수있다.  
  lastLoggedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'last_logged_at'
  },

  // 사용자들의 접속한 지역을 확인할수있다.
  lastConnectedIp: {
    type: Sequelize.STRING,
    validate : {
      isIP: true,
      isIPv4: true
    },
    field: 'last_connected_ip'
  },

  companyId: {
    type: Sequelize.INTEGER(11).UNSIGNED, 
    field: 'company_id'
  }

}, {

  setterMethods: {
    password: function(password) { 
      this.salt = Member.makeSalt();
      this.setDataValue('hashedPassword', Member.encryptPassword(password, this.salt));
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
      return Member.encryptPassword(plainText, this.salt) === this.hashedPassword;
    },

  },
  underscored: true,
  timestamps: false,
  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Member;