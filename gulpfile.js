var gulp   = require( 'gulp' ),
    server = require( 'gulp-develop-server' ),
    bs     = require( 'browser-sync' );

var options = {
    server: {
        path: './bin/www',
        execArgv: [ '--harmony' ]
    },
    bs: {
        proxy: 'http://localhost:3000'
    }
};

var serverFiles = [
    './bin/www',
    './server.js',
    './routes/*.js'
];

gulp.task( 'server:start', function() {

    // TODO: 변경사항을 감시할 Client 코드 추가
    gulp.watch("public/css/*.css").on('change', bs.reload);

    server.listen( options.server, function( error ) {
        if( ! error ) bs( options.bs );
    });
});

// If server scripts change, restart the server and then browser-reload.
gulp.task( 'server:restart', function() {
    server.restart( function( error ) {
        if( ! error ) bs.reload();
    });
});

gulp.task( 'default', [ 'server:start' ], function() {
    gulp.watch( serverFiles, [ 'server:restart' ] )
});