var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('scripts', function () {
    return browserify({entries: 'main.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/'));

});

gulp.task('default', ['scripts']);

