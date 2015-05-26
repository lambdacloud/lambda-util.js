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
  this.client = new elastic.Client(elasticConfigOrClient);
}

util.inherits(ElasticWritePipe, Writable);

// implement the Writable._write(chunk, encoding, callback) load chunk into ElasticSearch
ElasticWritePipe.prototype._write = function writeElastic(chunk, encoding, callback) {
  var bulkMessage = _.flatten(_.map(chunk, function(oneElement) {
    return [
      { index: { _index: oneElement.index, _type: oneElement.type, _id: oneElement.id} },
      oneElement.body
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
