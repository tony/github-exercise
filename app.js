/* global requirejs */

require.config({
  paths: {
    'underscore': './bower_components/lodash/dist/lodash',
    'tpl': '../tpl',
    'backbone': 'bower_components/backbone-amd/backbone',
    'backbone-all': 'lib/backbone-all',
    'backbone.noConflict': 'lib/backbone.noConflict',
    'backbone.marionette': 'bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
    'backbone.wreqr': 'bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
    'backbone.babysitter': 'bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
    'mustache': 'bower_components/mustache/mustache',
    'jquery': 'bower_components/jquery/jquery',
    'bootstrap': 'vendor/bootstrap/dist/js/bootstrap.min',
    'text': 'bower_components/text/text',
    'q': 'bower_components/q/q'

  },
  map: {
    '*': {
      'backbone': 'backbone-all'
    },
    'backbone-all': {
      'backbone': 'backbone.noConflict'
    },
    'backbone.marionette': {
      'backbone': 'backbone.noConflict'
    },
    'backbone.wreqr': {
      'backbone': 'backbone.noConflict'
    },
    'backbone.babysitter': {
      'backbone': 'backbone.noConflict'
    },
    'backbone.noConflict': {
      'backbone': 'backbone'
    }
  },
  shim: {
    'bootstrap': ['jquery']
    /*
     *jquery: {
     *  exports: 'jQuery'
     *},
     *underscore: {
     *  exports: '_'
     *},
     *backbone: {
     *  deps: ['jquery', 'underscore'],
     *  exports: 'Backbone'
     *}
     */
  }
});

require(['underscore', 'jquery', 'backbone', 'q', 'collections/decks', 'collections/lessons', 'collections/Cards', 'models/Pager', 'util/window_log', 'bootstrap', 'text'], function (_, $, Backbone, Q, decks, lessons, Cards, Pager) {
  var app = new Backbone.Marionette.Application();

  app.addInitializer(function (options) {
    console.log('App started. ' + Date());
    document.write('<script src="http://localhost:32883/livereload.js"></script>');

  });

  console.log('Object JS loaded! ' + Date());
  console.log('hi5')
  // return app;
});

console.log('JS File loaded!' + Date());
