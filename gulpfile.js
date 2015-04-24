var gulp   = require( 'gulp' ),
    server = require( 'gulp-develop-server' ),
    bs     = require( 'browser-sync' );

var options = {
    server: {
        path: './server/bin/www',
        execArgv: [ '--harmony' ]
    },
    bs: {
        proxy: 'http://localhost:3000'
    }
};

var serverFiles = [
    './server/bin/www',
    './server/server.js',
    './server/routes/*.js',
    './components/*.jsx',
    './server/views/**/*.hbs'
];

gulp.task( 'server:start', function() {

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
    
    // 서버사이드 파일 감지
    gulp.watch( serverFiles, [ 'server:restart' ] )

    // 클라이언트 사이드 파일 감지
    gulp.watch("./client/css/*.css").on('change', bs.reload);
    gulp.watch("./client/js/*.js").on('change', bs.reload);
});