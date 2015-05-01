var gulp  = require( 'gulp' );
var gutil = require('gulp-util');
var redis = require('redis');
var mysql = require('mysql');

gulp.task( 'dbcheck', function() {

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'dev',
    password : 'devcafeuser'
  });

  connection.connect(function(err) {
    if (err) {
      gutil.log(gutil.colors.red('MySQL Server is not running!, Please start server!'));
      process.exit(1);
      return;
    }

    gutil.log('MySQL Server is OK!g');
  });

});