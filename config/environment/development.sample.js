'use strict';

module.exports = {
  host: "localhost",
  port: 3000,
  database: {
    host    :'127.0.0.1',
    port : 3306,
    user : 'YOUR_ACCOUNT',
    password : 'YOUR_PASWORD',
    database:'YOUR_DATABASE'
  },
  nodemailer: {
    service: 'YOUR_MAIL_SERVICE',
    auth: {
      user: 'YOUR_MAIL_ADDR',
      pass: 'YOUR_MAIL_PASSWORD'
    }
  }
};