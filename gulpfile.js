'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var srcFiles = [
  'src/modules/*.js',
  'src/**/*.{js,html}',
  '!src/**/*Spec.js'
];

var templateCacheOptions =  {
  standalone: false,
  module: 'formly.render'
};

var isHtml = /[.]html$/;
var isJs = /[.]js/;

gulp.task('build', function() {
  gulp.src(srcFiles)
    .pipe($.if(isJs, $.jshint()))
    .pipe($.if(isJs, $.jshint.reporter('default')))
    .pipe($.if(isHtml, $.minifyHtml()))
    .pipe($.if(isHtml, $.angularTemplatecache(templateCacheOptions)))
    .pipe($.ngAnnotate())
    .pipe($.concat('formly.js'))
    .pipe(gulp.dest('dist'))
    .pipe($.rename({extname: '.min.js'}))
    .pipe($.uglifyjs({
      outSourceMap: 'formly.min.map',
      sourceRoot: '/'
    }))
    .pipe(gulp.dest('dist'))
    .pipe($.connect.reload());
});

gulp.task('server', function() {
  $.connect.server({
    root: 'demo',
    port: 4000,
    livereload: true
  });
});

gulp.task('test', function() {
  gulp.src([
    'bower_components/chai/chai.js',
    'bower_components/angular/angular.js',
    'src/**/*.js',
  ], {read: false}) 
    .pipe($.mocha({ui: 'bdd', reporter: 'nyan'}));
});

gulp.task('publish', function() {
  gulp.src('./demo/**/*.{html,css,js,map}')
  .pipe($.ghPages());
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['build']);
});

gulp.task('clean', function() {
  gulp.src(['dist/*.{js,map}'], {read: false})
    .pipe($.rimraf({force: true}));
});

gulp.task('dev', ['clean', 'build', 'server', 'watch']);
