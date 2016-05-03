var gulp = require('gulp');
var plug = require('gulp-load-plugins')({ lazy: true });

var browserify = require('browserify');
var babelify = require('babelify');
var babel = require('babel-core/register');
var source = require('vinyl-source-stream');

gulp.task('babelify', function () {
  return browserify({
    extensions: ['.jsx', '.js'],
    entries: './app.jsx',
  })
    .transform(babelify.configure({ ignore: /(node_modules)/ }))
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('app.js'))
    .pipe(gulp.dest('./output/'));
});

gulp.task('build',['babelify'], function(){
  return gulp.src('phq9Survey.html')
        .pipe(plug.open(), {app: 'google-chrome'});
});