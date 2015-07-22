var elastic = require('elasticsearch');
var util = require('util');
var Writable = require('stream').Writable;
var _ = require('lodash');
var log = require('debug');

// Enable debugging
log.enable('elastic-write-pipe:info');

var info = log('elastic-write-pipe:info');
var debug = log('elastic-write-pipe:debug');

function ElasticWritePipe(elasticConfigOrClient)
{
  Writable.call(this, { objectMode: true });
  this.client = _.isFunction(elasticConfigOrClient.search) ? elasticConfigOrClient
                                                           : new elastic.Client(elasticConfigOrClient);
}

util.inherits(ElasticWritePipe, Writable);

// implement the Writable._write(chunk, encoding, callback) load chunk into ElasticSearch
ElasticWritePipe.prototype._write = function writeElastic(chunk, encoding, callback) {
  //check chunk is an array or not, if not change it to an array
  if (!_.isArray(chunk)) {
    chunk = [chunk];
  }

  var bulkMessage = _.flatten(_.map(chunk, function(elem) {
    return [
      { index: { _index: elem.index, _type: elem.type, _id: elem.id} },
        elem.body
    ];
  }));

  //use client.bulk upload log in bulk
  debug("the message write to ElasticSearch: " + JSON.stringify(bulkMessage));

  this.client.bulk({body: bulkMessage})
    .then(function(response) {
      callback();
    })
    .catch(function(error) {
      throw new Error("error happened, when you write a message to ElasticSearch");
    })
    .done();
};

module.exports = ElasticWritePipe;
