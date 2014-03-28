// Fetch all the files to be loaded by Karma; parse the actual tests
// based on '.spec.js' filter
var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    /* Add all the files within app/test path with .spec.js suffix */
    if (/spec\/app\/.+.js$/.test(file)) {
      tests.push(file);
    }
  }
}

// Fetch the base (main) config, override by Karma specific base url.
// Then run the tests.
  var baseUrl = 'base/';
  require.config({
    baseUrl: baseUrl,
    paths: {
      "app": "_static/app"  
    }
  });
  // Start the tests
  require(tests, function() {
    window.__karma__.start();
    // console.log('Tests ran:', tests);
  });
