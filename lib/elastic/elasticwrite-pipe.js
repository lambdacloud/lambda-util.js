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

var client = new Elastic.Client({
  host: 'localhost:9200',
  keepAlive: false,
  log: 'trace'
});

function ElasticNewPipe()
{
  Writable.call(this, { objectMode: true });
}

util.inherits(ElasticNewPipe, Writable);

// implement the Writable._write(chunk, encoding, callback) load chunk in Local ElasticSearch
ElasticNewPipe.prototype._write = function writeElastic(chunk, encoding, callback) {
  client.create(chunk, function(error, response) {
    if (error) {
      console.log("error happened");
    }
  })
  callback();
};

module.exports = ElasticNewPipe;
