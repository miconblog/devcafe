var gulp   = require( 'gulp' ),
    server = require( 'gulp-develop-server' ),
    bs     = require( 'browser-sync' ),
    config = require( '../config/environment');

var options = {
    server: {
        path: './server/bin/www',
        execArgv: [ '--harmony' ],
        delay: 1800
    },
    bs: {
        port: config.port,
        proxy: 'http://localhost:' + config.port,
        ui: false
    }
};

gulp.task( 'server:start', function() {

    server.listen( options.server, function( error ) {
        if( ! error ) bs( options.bs );
    });
});

// If server scripts change, restart the server and then browser-reload.
gulp.task( 'server:restart', function() {
    server.restart( function( error ) {
        if( ! error ) { 
            setTimeout(bs.reload, 200);
        }
    });
});

gulp.task( 'browser:reload', function() {
    bs.reload();
});
