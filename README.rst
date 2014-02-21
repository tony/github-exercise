=========================
Github Front-end Exercise
=========================

Prerequisites
-------------

- NodeJS
- Grunt, Bower ``$ [sudo] npm install -g grunt-cli bower``.
- git
- command line

Usage
-----

- Install pre-requesites (NodeJS, the grunt and bower packages)
- ``$ git clone --recursive https://github.com/tony/github-exercise.git``.
  Note: ``--recursive``, if supported by your git (likely) will make
  next step unnecessary.
- ``$ cd`` into the directory.
- ``$ git submodule init && git submodule update`` (downloads bootstrap
  submodule).
- ``$ npm install``
- ``$ bower install``
- ``$ gulp`` will automatically build the CSS and JS, in addition to
  starting a local server for development. Also, the JS and LESS files
  will be watched, upon editing they will be linted and built  (js) or
  trigger livereload and built (less).

Upon final release, this project is also meant to be ran via the built CSS
and JS files. If enough time, have gulp allow building a ``./dist`` with
the latest ``index.html``, js and css build.

Usage (no build required):
--------------------------

Get: 

a. Download zip: https://github.com/tony/github-exercise/archive/master.zip

b. from git ``$ git clone https://github.com/tony/github-exercise.git``

Open:

a. Open ``index.built.html`` in your web browser.

or

b. ``$ python -m SimpleHTTPServer`` from project directory, navigate to
   http://localhost:8000/index.built.html.

File layout
-----------

- ``index.html``: index.html based on instructions.
- ``index.static.html``: run the built version of application.
- ``index.js``: AMD Format.

Build out (Production):

- ``_static/index.js`` [built output] - finalized index.js wrapped with
  dependencies. ``$ gulp build``.
- ``_static/app.css`` [built output] - app CSS, compiled *with* bootstrap
  ``$ gulp less``.
- ``_static/img/`` - images

Development (CSS):

- ``less``: less files

  - ``less/app.less``: main app CSS
  - ``less/bootstrap.less``: links together custom, stripped-down build
    of bootstrap.
  - ``less/variables.less``: customized bootstrap variables.

Third party JS/CSS:

- ``_vendor``: third party libraries
- ``_vendor/bootstrap`` (git submodule) - bootstrap
- ``_vendor/bower_components``: other browser JS libraries (bootstrap,
  almond, etc).

Utility Libraries;

- ``_util``: js utility libraries
- ``_util/emitter.js``: Event Emitter required by the instructions. Uses
  `EventEmitter2`_ (License MIT [1]) to support wildcards. Wrapped into
  `UMD`_ [2].

Internals:

- ``node_modules``: local node modules
- ``package.json``: node project manifest, contains ``node_modules``
  dependencies. Used for ``$ npm install``.
- ``gulpfile.js``: Gulpfile (like Grunt). Used by ``gulp``
- ``.bowerrc``: For bower, sets download dir to
  ``_vendor/bower_components``.
- ``bower.json``: Bower package manifest, used by ``$ bower install``.


Libraries Usage / Explanation
-----------------------------

- `michael/github`_ (License: BSD)

  alterations: vendorized (kept locally in vcs) and wrapped into an
  AMD-compatible format (not enough time to full umd).

  massive time saver (considering API throttling PITA). solid library.

  usage: used to pull information from gh. ``XMLHttpRequest`` in object
  format.

  alternative: If I hadn't used this module, something like `jQuery.ajax`_
  would have been the go to alternative. Their api is friendly - the pain
  point is their rate limit.

  explanation: wrapper around github API.
- `backbone`_

  usage: event passing between models/collection of GH data and DOM views.
- `backbone.marionette`_

  usage: `CompositeView` for table layout.

  explanation: created by Backbone-god Derick Bailey.

  other: `backbone.marionette annotated source`_
- `lodash`_ (replacement for `underscore`_): utilities library. requirement

  of backbone. Speed improvements. Browser consistency improvements. Carried
  forward, potential for minimalized builds on production environments.
- `Moment.js`_ - for time conversions
- `jQuery`_ 2.x - all-around, required by backbone. Fast. Known by
  many other devs. Carried forward, potential for speed improvements on
  production environments.

Why this layout
---------------

Best practices and patterns are useless without explanation of why. Here
is a breakdown:

Project settings:

- Uses global configuration variables. Utilizes ``package.json`` variables
  for gulp settings. This allows a clean, centralized place for dev
  hostname and port variables to be configured.  Carried forward, a
  ``.gitignore`` ignoring ``config.local.js`` could be mixed in with
  ``package.json``'s default gulp settings (inside the ``pkg.gulp`` key)
  to give the developer control of their own ports/hostnames, without
  conflicting with other developer's git workflow + other ports/hostnames
  they are using on that machine for development.

Dependency Libraries:

- Get + build the latest updates for:

  - Bootstrap
  - Browser modules
  - Utility modules (gulp)

  This allows an isolated project (with flexibility to use the latest and
  greatest modules) to update dependencies and features easily with lowest
  cost possible.

  In addition, if this project was highly dependent:
  
  - the git module for bootstrap could be set to a ref/tag (to a specific
    bootstrap version release, i.e. ``v3.0.1``.
  - the node module dependencies could be frozen in ``package.json``.
  - the browser js libraries dependencies can be frozen in ``bower.json``.

CSS:

- Loading LESS without building (dev, local, speed). If developing on a
  remote (via ssh), this can be switched off to just use builds of
  compiled css files.
- The same pattern applies to SASS.

Javascript: 

- Linting JS
- Requirejs config:

  - defaults application in ``index.js`` (note, .js not .html) which
  are used for production buildouts.
  - ``index.html`` for development and loading required dependencies
  (``emitter.js``, jQuery, backbone) async.
- Loading JS without buliding (dev, local, speed). As with above, on
  remote development (and of course production) turned off to just use
  builds.
- During development, allows async loading of dependencies.
- Allows loading via normal AMD modules.
- For productions, allows loading via a single, minified JS file. (wrapped
  in an almond, no ``require.js`` script tag is necessary, the almond wrap
  compiles with ``window.require`` included.)

Building:

- Uses `gulp`_. Gulp does the same tasks that `Grunt`_ is supposed to do
  (buildouts, lints, watching files) but instead utilizes node's stream
  and callbacks to provide blazing fast builds, often with less code.

- Another cool thing about `gulp`_ is it's "closer to the roots", it often
  passes in arguments directly to a build tool, instead of acting "special
  things" on top, which can be misleading to developers.

  For instance, gulp uses `r.js`_ for AMD builds directly. Grunt's
  `gruntjs/grunt-contrib-requirejs`_ and `asciidisco/grunt-requirejs`_ both
  hide the signature behind their own declarative language of options. And there
  is two of them, which is a duplicative effort. It's confusing and can make
  front-end developer ignorant of their own tools.

.. _r.js: https://github.com/jrburke/r.js/
.. _gruntjs/grunt-contrib-requirejs: https://github.com/gruntjs/grunt-contrib-requirejs
.. _asciidisco/grunt-requirejs: https://github.com/asciidisco/grunt-requirejs

Moving this forward
-------------------

Deployment:

- Fabric: Deployment of CSS and JS a way to push to a production
  environment. This can be done via ``fabric`` in python. Requires python.
- S3 / gulp push: pushing to a real server via ``sftp``, or by pushing to
  an ``s3`` or ``cdn`` bucket.

Swappability of style frameworks:

- This could use any framework. For instance, it could use `SASS bootstrap`_
  (which is an official port). Also, it could use `zurb`_ foundation..

User Interface:

- Carried forward: olishing can be done between `backbone.marionette`
  renderings to improve the smoothness between async routines.

Production speed improvements:

- `jQuery` can support custom builds.
- `Lo-Dash` (a.k.a. `lodash`_) can support custom builds. 

Todo
----

- Trigger a stream of a newly built .css and .js in addition to
  livereloads for the JS and CSS files. Currently it just lints / reloads.
- gulp task build to ./dist (index.html, app.js (or index.js, just naming)
  and app.js)

[1] Permissive licenses are freely available to reuse for our purposes.
Using viral licensed software (LGPL, GPLv2/3) can trigger complicated
derivitive issues.
[2] `UMD`_ is a triple win, it's a method of wrapping a javascript app or
library to support loading in AMD (commonly used in browser), CommonJS
(commonly used in node), and as a normal script in the browser.

.. _EventEmitter2: https://github.com/asyncly/EventEmitter2
.. _UMD: https://github.com/umdjs/umd
.. _SASS bootstrap: https://github.com/twbs/bootstrap-sass
.. _Grunt: http://www.gruntjs.org
.. _gulp: http://gulpjs.com
.. _zurb: https://github.com/zurb/foundation

.. _michael/github: https://github.com/michael/github
.. _underscore: http://underscorejs.org
.. _backbone: http://backbonejs.org
.. _backbone.marionette: https://github.com/marionettejs/backbone.marionette
.. _backbone.marionette annotated source: http://marionettejs.com/docs/backbone.marionette.html
.. _lodash: http://lodash.com
.. _Lo-Dash: http://lodash.com
.. _jQuery: http://jquery.org
.. _jQuery.ajax: https://api.jquery.com/jQuery.ajax/
.. _CompositeView: https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.compositeview.md
.. _Moment.js: http://momentjs.com/
