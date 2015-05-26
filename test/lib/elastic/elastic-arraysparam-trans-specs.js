var ElasticArraysparamTrans = require('../../../lib/elastic/elastic-arraysparam-trans');
var eventStream = require('event-stream');

describe('this is a test for elastic-arraysparam-trans', function() {
  it('should be a array instead of one message', function(done) {
    var message1 = {
      index: 'message',
      type: 'type',
      id: 'abcde',
      body: '1all you have'
    };
    var message2 = {
      index: 'message',
      type: 'type',
      id: 'hijkl',
      body: '2nothing is impossible'
    };
    var message3 = {
      index: 'message',
      type: 'type',
      id: 'uvwxyz',
      body: '3just do it'
    };
    var message4 = {
      index: 'message',
      type: 'type',
      id: 'abcde',
      body: '4all you have'
    };
    var message5 = {
      index: 'message',
      type: 'type',
      id: 'hijkl',
      body: '5nothing is impossible'
    };
    var message6 = {
      index: 'message',
      type: 'type',
      id: 'uvwxyz',
      body: '6just do it'
    };
    var message7 = {
      index: 'message',
      type: 'type',
      id: 'abcde',
      body: '7all you have'
    };
    var message8 = {
      index: 'message',
      type: 'type',
      id: 'hijkl',
      body: '8nothing is impossible'
    };
    var message9 = {
      index: 'message',
      type: 'type',
      id: 'uvwxyz',
      body: '9just do it'
    };
    var sourceArray = [
      {
        index: 'message',
        type: 'type',
        id: 'abcde',
        body: '1all you have'
      },
      {
        index: 'message',
        type: 'type',
        id: 'hijkl',
        body: '2nothing is impossible'
      },
      {
        index: 'message',
        type: 'type',
        id: 'uvwxyz',
        body: '3just do it'
      },
      {
        index: 'message',
        type: 'type',
        id: 'abcde',
        body: '4all you have'
      },
      {
        index: 'message',
        type: 'type',
        id: 'hijkl',
        body: '5nothing is impossible'
      },
      {
        index: 'message',
        type: 'type',
        id: 'uvwxyz',
        body: '6just do it'
      },
      {
        index: 'message',
        type: 'type',
        id: 'abcde',
        body: '7all you have'
      },
      {
        index: 'message',
        type: 'type',
        id: 'hijkl',
        body: '8nothing is impossible'
      },
      {
        index: 'message',
        type: 'type',
        id: 'uvwxyz',
        body: '9just do it'
      }
    ]
    var result = [message5, message6, message7, message8];
    assertArraysTrans(sourceArray, result, done);
  })
})

function assertArraysTrans(input, expect, done) {
  var elasticArraysparamTrans = new ElasticArraysparamTrans(4);
  var reader = eventStream.readArray(input);
  var writer = eventStream.writeArray(function (err, array) {
    array[1].should.eql(expect);
    done();
  });

  reader.pipe(elasticArraysparamTrans).pipe(writer);
}