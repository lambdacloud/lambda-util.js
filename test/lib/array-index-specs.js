/**
 * Created by sunyonggang on 2015/5/22.
 */
var assert = require("assert");
var fs = require("fs");
describe('Array', function() {
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(5));
      assert.equal(0, [1, 2, 3].indexOf(1));
    })
  })
});
/*
describe('File', function() {
  describe('#readFile()', function() {
    it('should read test.txt without error', function(done) {
      fs.readFile('test.txt', function(err) {
        if (err) throw err;
        done();
      });
    })
    it('should read test.js without error', function(done) {
      fs.readFile('test.js', function(err) {
        if (err) throw err;
        done();
      });
    })
  })
})
*/
describe('File', function() {
  describe('#readFile()', function() {
    it('should read test.txt without error', function() {
      });
  })
})

