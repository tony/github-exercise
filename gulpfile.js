var gulp = require('gulp');
var recess = require('gulp-recess');
var less = require('gulp-less');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var rjs = require('requirejs');

gulp.task('less', function () {
  gulp.src('./less/app.less')
  .pipe(less({
    paths: ['./less/', './vendor/bootstrap/less/'],
    filename: 'app.less'
  }))
  .pipe(gulp.dest('../static/'));
});

gulp.task('lint', function() {
  return gulp.src(['./**/*.js', '!./{node_modules,vendor}/**'])
    .pipe(jshint('../.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('build', function(cb) {
  console.log(rjs.optimize({
    wrap: true,
    baseUrl: './',
    almond: true,
    out: './static/app.js',
    include: './app',
    mainConfigFile: './app.js',
    enforceDefine: true,
    name: './bower_components/almond/almond',
    paths: {
      'underscore': './bower_components/lodash/dist/lodash',
      'tpl': '../tpl',
      'backbone': 'bower_components/backbone-amd/backbone',
    },
    map: {
      '*': {
        'backbone': 'backbone-all'
      },
      'backbone-all': {
        'backbone': 'backbone.noConflict'
      },
      'backbone.noConflict': {
        'backbone': 'backbone'
      }
    },
    shim: {
      'bootstrap': ['jquery']
    }}, function(buildResponse){
        // console.log('build response', buildResponse);
        cb();
      }, cb));
});

var liveReloadCSS = function() {
  var server = livereload(32882);
  gulp.watch('./less/*.less', function(evt) {
      server.changed(evt.path);
  });
};

var liveReloadJS = function() {
  var javascriptServer = livereload(32883);
  gulp.watch(['./app.js', '!./{node_modules,_vendor}/**'], function(evt) {
      javascriptServer.changed(evt.path);
  });
};

gulp.task('watch', function() {
  liveReloadCSS()
  liveReloadJS()
  gulp.watch('less/*.less', ['less'])
});

gulp.task('default', ['watch']);
