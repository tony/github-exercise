/* global requirejs */

require.config({
  paths: {
    "t": "templates",
    "underscore": "_vendor/bower_components/lodash/dist/lodash",
    "backbone": "_vendor/bower_components/backbone/backbone",
    "backbone-all": "lib/backbone-all",
    "backbone.noConflict": "lib/backbone.noConflict",
    "backbone.marionette": "_vendor/bower_components/backbone.marionette/lib/core/amd/backbone.marionette",
    "backbone.wreqr": "_vendor/bower_components/backbone.wreqr/lib/amd/backbone.wreqr",
    "backbone.babysitter": "_vendor/bower_components/backbone.babysitter/lib/amd/backbone.babysitter",
    "mustache": "_vendor/bower_components/mustache/mustache",
    "jquery": "_vendor/bower_components/jquery/dist/jquery",
    "bootstrap": "_vendor/bootstrap/dist/js/bootstrap.min",
    "text": "_vendor/bower_components/text/text",
    "q": "_vendor/bower_components/q/q",
    "EventEmitter": "util/emitter",
    //"Github": "_vendor/bower_components/github/github",
    "Github": "_vendor/github",
    "Base64": "_vendor/base64"
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
  }
});

require([
  'underscore', 'jquery', 'backbone', 'mustache',
  'EventEmitter', 'q', 'Github', 
  'text!t/profile-input.mustache',
  'text!t/repo-table.mustache', 'text!t/repo-table-row.mustache',
  'text!t/repo-table-row-empty.mustache',
  'util/window_log',
  'bootstrap', 'text',
], function (
  _, $, Backbone, Mustache,
  EventEmitter, Q, Github,
  ProfileInputTpl,
  RepoTableTpl, RepoTableRowTpl,
  RepoTableRowEmptyTpl) {
  var app = new Backbone.Marionette.Application();

  // Sample for handling the rendering
  //
  // var emitter = new EventEmitter();
  //
  // function loadRepos(user){
  //   emitter.emit('data.repos', repos);
  //   repos.forEach(function(repo){
  //     loadBranches(repo);
  //     loadCollaborators(repo);
  //   });
  //   emitter.on('data.branches.*', renderBranches);
  //   emitter.on('data.collaborators.*', renderCollaborators);
  // }
  //
  // function loadBranches(repo){
  //   emitter.emit('data.branches.jquery', branches);
  // }
  //
  // function loadCollaborators(repo){
  //   emitter.emit('data.collaborators.jquery', collaborators);
  // }
  //
  // // render repositories data
  // function renderBranches(data, type){ }
  //
  // // render branches data
  // function renderBranches(data, type){ }
  //
  // // render collaborators data
  // function renderCollaborators(data, type){ }

  var github = new Github({
    token: "461b5636e8d8e58f6fccf71d65cd008571dda11b",
    auth: "oauth"
  });
  window.gh = github;

  var User = Backbone.Model.extend({
    initialize: function() {
      // Include Github.User instance with Oauth token in context.
      this.gh = gh.getUser();
    },
    sync: function(method, model, options) {
      // Override sync for read/GET to use Github.js.
      var login = model.get('login');

      if (method !== 'read') {
        return Backbone.sync.apply(this, arguments);
      }

      this.gh.show(login, function(err, resp) {
        
        if (resp) {
          options.success(resp);
        } else {
          options.error(err);
        }
      });

    }
  });

  window.User = User;

  var Repos = Backbone.Collection.extend({
    
  });

  var Repo = Backbone.Model.extend({

  });

  var Branch = Backbone.Model.extend(Repo, {

  });

  var Collaborators = Backbone.Collection.extend({
    model: User
  });


  var emitter = new EventEmitter();

  function loadUser(uesrname){
    username = 2;
  };
  
  function loadRepos(login){

    // Create Marionette Repos Layout
    // Create Marionette RepoTable, linked to collection of Repos
    //  When empty, show ... Retreiving repos
    // Then when Repo shows, Layout for each row
    // Row has {{reponame}} <div class="branches"> which listens to view of
    // branches, <div class="collaborators"> which listens to collection of
    // collaborations. {{last update}}
    // The script will be data bound, where Marionette will automatically fuse
    // to listening to Collection and Models and show when data arrives.


    // Prepare Views as object in advance for data propagation.

    var user = new User({
      "login": login
    });
    user.fetch();

    var repos = new Repos([], {
      "user": user
    });

    var RepoLayout = Backbone.Marionette.Layout.extend({
      template: '<div id="repo-table"></div>',
      regions: {
        table: '#repo-table'
      }
    });

    var RepoTableRow = Backbone.Marionette.ItemView.extend({
      template: RepoTableRowTpl,
      tagName: "tr",
    });

    var RepoTableRowEmpty = Backbone.Marionette.ItemView.extend({
      template: RepoTableRowEmptyTpl,
      tagName: "tr",
    });


    var RepoTable = Backbone.Marionette.CompositeView.extend({
      template: RepoTableTpl,
      collection: repos,
      model: user,
      emptyView: RepoTableRowEmpty,
      itemView: RepoTableRow,
      itemViewContainer: "tbody",
    });

    var repoTable = new RepoTable();

    repoLayout = new RepoLayout();

    app.repos.show(repoLayout);
    repoLayout.table.show(repoTable);
  }

  window.loadRepos = loadRepos;
  
  function loadBranches(repo){
    emitter.emit('data.branches.jquery', branches);
  }
  
  function loadCollaborators(repo){
    emitter.emit('data.collaborators.jquery', collaborators);
  }
  
  // render repositories data
  function renderBranches(data, type){ }
  
  // render branches data
  function renderBranches(data, type){ }
  
  // render collaborators data
  function renderCollaborators(data, type){ }


  // The above functions will be part of a modified Backbone.Model
  // User - Backbone.Model - gh user
  //   User.Repos (self.repos) is a Backbone.Collection of Repo which pulls the
  //   latest repo information.
  // Repo - Backbone.Model
  //   Repo.Branches (self.branches) - bb collection of Branches.
  //   Repo.Collaborators (self.collaborators) - bb collection of Collaborators.





  Backbone.Marionette.Renderer.render = function(template, data) {
    return Mustache.render(template, data);
  };
  app.addRegions({
    repos: "#repos",
    profile: "#profile"
  });

  var MyModel = Backbone.Model.extend({

  });

  var ProfileLayout = Backbone.Marionette.Layout.extend({
    template: '<form id="profile-input"></form>',
    regions: {
      input: '#profile-input'
    }
  });


  var ProfileInput = Backbone.Marionette.ItemView.extend({
    template: ProfileInputTpl,
    className: 'input-group',
    events: {
      'keydown': 'keyPress',
      'click button': 'submitForm',
      'submit': 'submitForm'
    },
    keyPress: function(e) {
      if (e.which === 13) {
        e.preventDefault();
        e.stopPropagation();
        this.$('button').click();
      }
    },
    submitForm: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var login = this.$('input[type=text]').val();
      loadRepos(login);
      return false;
    },
    modelEvents: {
      'change': 'render'
    },
    model: new Backbone.Model
  });  // similar to Backbone.View


  var profile = new ProfileLayout()
  app.profile.show(profile);


  var profileInput = new ProfileInput();

  profile.input.show(profileInput);



  app.addInitializer(function (options) {
    console.log('App started. ' + Date());
  });

  app.start();

  console.log('Object JS loaded! ' + Date());
  return app;
});
