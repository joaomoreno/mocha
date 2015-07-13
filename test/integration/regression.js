var assert = require('assert');
var path = require('path');
var run    = require('./helpers').runMocha;

describe('regressions', function() {
  this.timeout(1000);

  it('issue-1327: should run all 3 specs exactly once', function(done) {
    var args = [];
    run('regression/issue-1327.js', args, function(err, res) {
      var occurences = function(str) {
        var pattern = new RegExp(str, 'g');
        return (res.output.match(pattern) || []).length;
      };

      assert(!err);
      assert.equal(occurences('testbody1'), 1);
      assert.equal(occurences('testbody2'), 1);
      assert.equal(occurences('testbody3'), 1);

      assert.equal(res.code, 1);
      done();
    });
  });

  it('issue-1794: Can\'t --require custom UI and use it', function(done) {
    var simpleUiPath = path.join(__dirname, 'fixtures', 'regression', '1794', 'simple-ui.js');
    var args = ['--require', simpleUiPath, '--ui', 'simple-ui'];
    run('regression/1794/issue-1794.js', args, function(err, res) {
      assert.equal(res.code, 0, 'Custom UI should be loaded');
      done();
    });
  });
});
