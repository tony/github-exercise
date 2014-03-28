/* jshint -W030 */
define(['index'], function(app) {
  describe('App', function() {

      describe('Main object', function() {
          var schema = {};

          it('should exist', function() {
              expect(app).to.exist;
          });

          it('should have profile layout', function() {
              expect(app.profile).to.exist;
              expect(app.profile).to.not.equal('String');
          });

      });
  });

});
