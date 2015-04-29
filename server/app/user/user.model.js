'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../libs/sequelize-instance');
var crypto = require('crypto');

var User = sequelize.define('user', {
  
  name: {
    type: Sequelize.STRING
  },

  hashedPassword: {
    type: Sequelize.STRING,
    validate: {
     // allowNull: false, 
     // notEmpty: true, 
    }
  },

  salt: {
    type: Sequelize.STRING
  },

  authData: {
    type: Sequelize.TEXT
  },

  email: {
    type: Sequelize.STRING
  },

  emailVerified: {
    type: Sequelize.BOOLEAN
  }

}, {

  getterMethods: {
    //password : function()  { return this.hashedPassword }
  },
  setterMethods: {
    password: function(password) { 
      this.salt = User.makeSalt();
      this.setDataValue('hashedPassword', User.encryptPassword(password, this.salt));
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
      return User.encryptPassword(plainText, this.salt) === this.hashedPassword;
    },

  },

  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = User;