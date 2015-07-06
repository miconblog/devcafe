var Sequelize = require('sequelize');
var dbconf = require('../../../config/environment').database;
var sequelize = new Sequelize(dbconf.database, dbconf.user, dbconf.password, {
  host: dbconf.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
module.exports = sequelize;