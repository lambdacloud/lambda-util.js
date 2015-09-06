var elastic = require('elasticsearch');
var util = require('util');
var Readable = require('stream').Readable;
var _ = require('lodash');
var log = require('debug');
var err = require('../error');
var sets = require('../sets-plus');

// Enable debugging
log.enable('elastic-mappings:info');

var debug = log('elastic-mappings:debug');

function ElasticMappings()
{
  Readable.call(this, { objectMode: true });
}

ElasticMappings.prototype.map = function(elasticConfigOrClient, indices, type, query, cb) {
  var mappingKeys = [];
  var self = this;
  this.client = _.isFunction(elasticConfigOrClient.search) ? elasticConfigOrClient
    : new elastic.Client(elasticConfigOrClient);
  this.searchParam = sets.filter({
    index: indices,
    type: type,
    body: query,
    scroll: '1m',
    searchType: 'scan'
  }, function(v) {
    return (v) ? true : false;
  });

  debug('Search param: ' + JSON.stringify(this.searchParam));

  this.client.indices.getMapping(this.searchParam)
    .then(function(res) {
      var typeMappings = res[indices]["mappings"];
      _.forEach(typeMappings, function(mappings) {
        mappingKeys = _.union(mappingKeys, _.keys(mappings["properties"]));
      });
      cb(mappingKeys);
    })
    .catch(err.throwErrMessage)
    .done();
};

module.exports = ElasticMappings;