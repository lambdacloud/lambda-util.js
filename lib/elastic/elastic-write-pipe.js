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

// implement the Writable._write(chunk, encoding, callback) load chunk in Local ElasticSearch
ElasticWritePipe.prototype._write = function writeElastic(chunk, encoding, callback) {

  this.client.create(chunk)
    .then(function(response) {
      debug(chunk);
      callback();
    })
    .catch(function(err) {
      throw new Error("error happened, the message exists");
    })
    .done();
};

module.exports = ElasticWritePipe;
