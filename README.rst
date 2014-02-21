==================================
Favorite Medium Front-end Exercise
==================================

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

- ``index.html`` - index.html based on instructions.
- ``index.js`` - AMD Format
- ``_static/index.js`` [built output] - finalized index.js wrapped with
  dependencies.
- ``less`` - less files

  - ``less/app.less`` - main app CSS
  - ``less/bootstrap.less`` - links together custom, stripped-down build
    of bootstrap.
  - ``less/variables.less`` - customized bootstrap variables.
- ``_vendor`` - third party libraries
- ``_vendor/bootstrap`` (git submodule) - bootstrap
- ``_util`` - js utility libraries
- ``_util/emitter.js`` - Event Emitter required by the instructions. Uses
  `EventEmitter2`_ (License MIT [1]) to support wildcards.


.. _EventEmitter2: https://github.com/asyncly/EventEmitter2

[1] Permissive licenses are freely available to reuse for our purposes.
Using viral licensed software (LGPL, GPLv2/3) can trigger complicated
derivitive issues.
