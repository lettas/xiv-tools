var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var target = 'cactpot';

function targetFilePath(target) {
  return './' + target + '/main.js';
}

gulp.task('build', function() {
    rebundle(target, browserify(targetFilePath(target)));
});

gulp.task('watch', function () {
    var bundler = watchify(browserify(targetFilePath(target)), watchify.args);
    bundler.rebundle = function() { rebundle(target, bundler); };
    bundler.on('update', bundler.rebundle);
    bundler.rebundle();
});

function rebundle(module, bundler) {
  return bundler
    .transform('partialify')
    .bundle()
    .on('error', function(e) {
        gutil.log('Browserify Error', e.message);
    })
    .pipe(source(module + '.js'))
    .pipe(gulp.dest('./build'));
}

