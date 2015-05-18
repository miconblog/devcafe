var Sequelize = require('sequelize');
var sequelize = new Sequelize('devcafe', 'dev', 'devcafeuser', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
module.exports = sequelize;

// Or you can simply use a connection uri
// var sequelize = new Sequelize('mysql://dev:devcafeuser@localhost:3306/devcafee');