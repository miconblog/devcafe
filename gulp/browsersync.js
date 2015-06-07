var gulp   = require( 'gulp' ),
    server = require( 'gulp-develop-server' ),
    bs     = require( 'browser-sync' );

var options = {
    server: {
        path: './server/bin/www',
        execArgv: [ '--harmony' ],
        delay: 1800
    },
    bs: {
        proxy: 'http://localhost:3000'
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
