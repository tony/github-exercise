=========================
Github Front-end Exercise
=========================

Tools required:

- NodeJS
- Grunt, Bower ``$ [sudo] npm install -g grunt-cli bower``.

Build tool:

- gulp

Usage:

- Install pre-requesites (NodeJS, the grunt and bower packages)
- ``$ git submodule init && git submodule update`` (downloads bootstrap
  submodule).
- ``$ npm install``
- ``$ bower install``

File layout:

- ``index.html``: index.html based on instructions.
- ``index.js``: AMD Format
- ``_static/index.js`` [built output] - finalized index.js wrapped with
  dependencies. ``$ gulp build``.
- ``_static/app.css`` [built output] - app CSS, compiled *with* bootstrap
  ``$ gulp less``.
- ``_static/img/`` - images
- ``less``: less files

  - ``less/app.less``: main app CSS
  - ``less/bootstrap.less``: links together custom, stripped-down build
    of bootstrap.
  - ``less/variables.less``: customized bootstrap variables.
- ``_vendor``: third party libraries
- ``_vendor/bootstrap`` (git submodule) - bootstrap
- ``_vendor/bower_components``: other browser JS libraries (bootstrap,
  almond, etc).
- ``_util``: js utility libraries
- ``_util/emitter.js``: Event Emitter required by the instructions. Uses
  `EventEmitter2`_ (License MIT [1]) to support wildcards. Wrapped into
  `UMD`_ [2].
- ``node_modules``: local node modules
- ``package.json``: node project manifest, contains ``node_modules``
  dependencies. Used for ``$ npm install``.
- ``gulpfile.js``: Gulpfile (like Grunt). Used by ``gulp``
- ``.bowerrc``: For bower, sets download dir to
  ``_vendor/bower_components``.
- ``bower.json``: Bower package manifest, used by ``$ bower install``.


Why this layout?

- Allows loading via normal AMD modules.
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
  
  - the git module for bootstrap could be set to a ref/tag.
  - the node module dependencies could be frozen in ``package.json``.
  - the browser js libraries dependencies can be frozen in ``bower.json``.

[1] Permissive licenses are freely available to reuse for our purposes.
Using viral licensed software (LGPL, GPLv2/3) can trigger complicated
derivitive issues.
[2] `UMD`_ is a triple win, it's a method of wrapping a javascript app or
library to support loading in AMD (commonly used in browser), CommonJS
(commonly used in node), and as a normal script in the browser.

.. _EventEmitter2: https://github.com/asyncly/EventEmitter2
.. _UMD: https://github.com/umdjs/umd

