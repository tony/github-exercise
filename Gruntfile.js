module.exports = function (grunt) {
  "use strict";

  var nconf = require('nconf');
  var path = require('path');

  var project_root = path.join(__dirname, '../');
  var app_dir = path.join(project_root, 'HSK');

  nconf.file({
    file: '../config/config.json'
  });

  grunt.initConfig({
    files: {
      js: ['Gruntfile.js', './app.js'],
      less: ['./less/**/*']
    },
    watch: {
      js: {
        files: ['<%= files.js %>'],
        tasks: [
          'jshint',
          //'requirejs:ui'
        ]
      },
      testing: {
        files: [
          'less/*.less',
          'app.js',
        ],
        tasks: [
          'less'
        ],
        options: {
          livereload: 32882,
        }
      },
      less: {
        files: [
          'less/**/*'
        ],
        tasks: ['recess']
      },
      on_build: {
        tasks:[
          'jshint'
        ],
        files: [
          //'less/**/*',
          '../HSK/tpl/*.mustache',
          '../HSK/**/*',
          '../static/*'
        ],
        options: {
          livereload: true,
          interrupt: false,
          debounceDelay: 1000
        }
      }
    },
    jshint: {
      all: {
        options: {
          jshintrc: '../.jshintrc'
        },
        files: {
          src: [
            '<%= files.js %>'
          ]
        }
      }
    },
    requirejs: {
      app: {
        options: {
          wrap: true,
          baseUrl: './',
          almond: true,
          out: './static/app.js',
          include: './app',
          mainConfigFile: './app.js',
          enforceDefine: true,
          name: './bower_components/almond/almond'
        }
      }
    },

    less: {
      ui: {
        options: {
          compile: true,
          compress: true,
          sourceMap: true,
          sourceMapFilename: '../static/app.css.map',
          sourceMapRootpath: '/assets/'
        },
        files: {
          '../static/app.css': ['less/app.less']
        }
      }
    },
    nodemon: {
      tornado_app: {

        options: {
          file: 'HSK/app.py',
          exec: 'python',
          cwd: project_root,
          watchedFolders: [
            app_dir
          ],

          stdout: true
        }
      }
    },

    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      },
      with_tornado: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }

    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['watch:testing']);
  grunt.registerTask('tornado', ['concurrent:with_tornado']);

  };
