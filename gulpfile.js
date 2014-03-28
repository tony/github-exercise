var pkg = require("./package.json");
var gulp = require('gulp');
var recess = require('gulp-recess');
var less = require('gulp-less');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var rjs = require('requirejs');

gulp.task('less', function () {
  gulp.src('./less/app.less')
  .pipe(less({
    paths: ['./less/', './vendor/bootstrap/less/'],
    filename: 'app.less'
  }))
  .pipe(gulp.dest('./_static/'));
});

gulp.task('lint', function() {
  return gulp.src(['./**/*.js', '!./{node_modules,vendor}/**'])
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('build', function(cb) {
  return rjs.optimize({
    baseUrl: './',
    almond: true,
    out: './_static/app.js',
    include: './app',
    mainConfigFile: './app.js',
    enforceDefine: true,
    name: './_vendor/bower_components/almond/almond',
    generateSourceMaps: true,
    preserveLicenseComments: false,
    optimize: "none",
    wrap: {
      startFile: 'lib/start.js',
      endFile: 'lib/end.js'
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
         console.log('build response', buildResponse);
        cb();
    });
});

var liveReloadCSS = function() {
  var server = livereload(32882);
  gulp.watch('./_static/app.css', function(evt) {
      server.changed(evt.path);
  });
};


var liveReloadLESS = function() {
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

///
// Static server
///
var serveStatic = require("serve-static");
var connect = require("connect");
var serverAddress = "http://" + pkg.gulp.server.host + ":" + pkg.gulp.server.port + "/";

gulp.task("server", function() {
  connect()
    .use(serveStatic(__dirname))
    .listen(pkg.gulp.server.port);
  gutil.log("Connect server running at " + serverAddress);
});

gulp.task("server.open", function() {
  // src is needed, but not used, cause of gulp way.
  gulp.src("./package.json")
    .pipe(require("gulp-open")("", {url: serverAddress}));
});

var karma = require('gulp-karma');


gulp.task("test", ['build'], function() {
  // Be sure to return the stream
  return gulp.src(['undefined.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});
 

gulp.task('watch', function() {
  liveReloadCSS()
  liveReloadJS()
  gulp.watch('less/*.less', ['less'])
});

gulp.task('default', ['less', 'build', 'watch', 'server']);
