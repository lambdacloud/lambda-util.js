var Elastic = require('elasticsearch');
var util = require('util');
var event = require('events');
var Writable = require('stream').Writable;
var _ = require('lodash');
var Log = require('debug');
var err = require('../error');

// Enable debugging
Log.enable('elasticwrite-pipe:info');

var info = Log('elasticwrite-pipe:info');
var debug = Log('elasticwrite-pipe:debug');

function ElasticWritePipe(elasticConfigOrClient)
{
  Writable.call(this, { objectMode: true });
  this.client = new Elastic.Client(elasticConfigOrClient);
}

util.inherits(ElasticWritePipe, Writable);

// implement the Writable._write(chunk, encoding, callback) load chunk in Local ElasticSearch
ElasticWritePipe.prototype._write = function writeElastic(chunk, encoding, callback) {

  this.client.create(chunk)
    .then(function(response) {
      console.log(chunk);
      callback();
    })
    .catch(function(err) {
      info("error happened, the message exists");
    })
    .done();
};

module.exports = ElasticWritePipe;
