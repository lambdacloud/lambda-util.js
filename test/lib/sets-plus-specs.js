var sets = require('../../lib/sets-plus');

describe('The enhanced sets library', function() {
  describe('#filter for object', function() {
    it('should can be used to clean up invalid values in object', function() {
      var origin = {
        a: 1,
        b: null,
        c: '',
        d: {}
      };

      var cleaned = sets.filter(origin, function(v) {
        return (v) ? true : false;
      });

      var expect = {
        a: 1,
        d: {}
      };

      cleaned.should.eql(expect);
    });
  });
});
