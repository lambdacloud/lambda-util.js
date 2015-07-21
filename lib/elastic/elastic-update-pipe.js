var elastic = require('elasticsearch');
var util = require('util');
var Writable = require('stream').Writable;
var _ = require('lodash');
var log = require('debug');

// Enable debugging
log.enable('elastic-update-pipe:info');

var info = log('elastic-update-pipe:info');
var debug = log('elastic-update-pipe:debug');

function ElasticUpdatePipe(elasticConfigOrClient)
{
  Writable.call(this, { objectMode: true });
  this.client = new elastic.Client(elasticConfigOrClient);
}

util.inherits(ElasticUpdatePipe, Writable);

// implement the Writable._update(chunk, encoding, callback) load chunk into ElasticSearch
ElasticUpdatePipe.prototype._update = function updateElastic(chunk, encoding, callback) {
  //check chunk is an array or not, if not change it to an array
  if (!_.isArray(chunk)) {
    chunk = [chunk];
  }

  var bulkMessage = _.flatten(_.map(chunk, function(elem) {
    return [
      { update: { _index: elem.index, _type: elem.type, _id: elem.id} },
      { doc: elem.body }
    ];
  }));

  //use client.bulk upload log in bulk
  debug("the message update to ElasticSearch: " + JSON.stringify(bulkMessage));

  this.client.bulk({body: bulkMessage})
    .then(function(response) {
      callback();
    })
    .catch(function(error) {
      throw new Error("error happened, when you update a message to ElasticSearch");
    })
    .done();
};

module.exports = ElasticUpdatePipe;
