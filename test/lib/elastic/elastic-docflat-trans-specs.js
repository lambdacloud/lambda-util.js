var ElasticDocflatTrans = require('../../../lib/elastic/elastic-docflat-trans');
var eventStream = require('event-stream');

describe('The elastic library docflat transform module', function() {
  it('should flat the Elastic document Object with taking "_source" field out', function(done) {
    var foodoc = {
      _index: 'fooindex',
      _source: {
        user: 'foouser',
        age: 20
      }
    };
    var expect = {
      _index: 'fooindex',
      user: 'foouser',
      age: 20
    };

    assertTransform(foodoc, expect, done);
  });

  it('should flat the Elastic document Object with removing "_score" field out', function(done) {
    var foodoc = {
      _index: 'fooindex',
      _score: '0',
      _source: {
        user: 'foouser',
        age: 20
      }
    };
    var expect = {
      _index: 'fooindex',
      user: 'foouser',
      age: 20
    };

    assertTransform(foodoc, expect, done);
  });
});

function assertTransform(input, expect, done) {
  var docflat = new ElasticDocflatTrans();
  var reader = eventStream.readArray([input]);
  var writer = eventStream.writeArray(function (err, array) {
    array[0].should.eql(expect);

    done();
  });

  reader.pipe(docflat).pipe(writer);
}
