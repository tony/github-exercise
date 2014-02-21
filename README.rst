=========================
Github Front-end Exercise
=========================

Tools required:

- NodeJS
- Grunt, Bower ``$ [sudo] npm install -g grunt-cli bower``.

Build tool:

- gulp

Usage
-----

- Install pre-requesites (NodeJS, the grunt and bower packages)
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

Todo
----

- Trigger a stream of a newly built .css and .js in addition to
  livereloads for the JS and CSS files. Currently it just lints / reloads.

File layout
-----------

- ``index.html``: index.html based on instructions.
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


Why this layout?

Best practices and patterns are useless without explanation of why. Here
is a breakdown 

- Uses global configuration variables. Utilizes ``package.json`` variables
  for gulp settings. This allows a clean, centralized place for dev
  hostname and port variables to be configured.  Carried forward, a
  ``.gitignore`` ignoring ``config.local.js`` could be mixed in with
  ``package.json``'s default gulp settings (inside the ``pkg.gulp`` key)
  to give the developer control of their own ports/hostnames, without
  conflicting with other developer's git workflow + other ports/hostnames
  they are using on that machine for development.
- Allows loading via normal AMD modules.
- Linting JS
- Loading LESS without building (dev, local, speed). If developing on a
  remote (via ssh), this can be switched off to just use builds of
  compiled css files.
- Loading JS without buliding (dev, local, speed). As with above, on
  remote development (and of course production) turned off to just use
  builds.
- During development, allows async loading of dependencies.
- For productions, allows loading via a single, minified JS file. (wrapped
  in an almond, no ``require.js`` script tag is necessary, the almond wrap
  compiles with ``window.require`` included.)
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
- Requirejs config in ``index.html`` for development and loading required
  dependencies (``emitter.js``, jQuery, backbone) async.
- Requirejs defaults application in ``index.js`` (note, .js not .html) which
  are used for production buildouts.

Moving this forward

- Deployment of CSS and JS a way to push to a production environment. This
  can be done via ``fabric`` in python, or a script in node. It can be done
  via pushing to a real server via ``sftp``, or by pushing to an ``s3`` or
  ``cdn`` bucket.

[1] Permissive licenses are freely available to reuse for our purposes.
Using viral licensed software (LGPL, GPLv2/3) can trigger complicated
derivitive issues.
[2] `UMD`_ is a triple win, it's a method of wrapping a javascript app or
library to support loading in AMD (commonly used in browser), CommonJS
(commonly used in node), and as a normal script in the browser.

.. _EventEmitter2: https://github.com/asyncly/EventEmitter2
.. _UMD: https://github.com/umdjs/umd

