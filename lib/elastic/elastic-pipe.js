var Elastic = require('elasticsearch');
var util = require('util');
var event = require('events');
var Readable = require('stream').Readable;
var _ = require('lodash');
var Log = require('debug');
var err = require('../error');

// Enable debugging
Log.enable('elastic-pipe:log');

var log = Log('elastic-pipe:log');
var debug = Log('elastic-pipe:debug');

function ElasticPipe(elasticConfig, indices, query)
{
  Readable.call(this);

  var self = this;
  this.client = new Elastic.Client(elasticConfig);
  this.query = query;
  this.setEncoding('utf8');

  this.client.search({
    index: indices,
    scroll: '1m',
    searchType: 'scan'
  })
    .then(function(res) {
      debug('Scan search responded scroll id ' + res._scroll_id.substr(0, 8));
      self.scrollId = res._scroll_id;
      self.emit('readable');
    })
    .catch(err.throwErrMessage)
    .done();
}

util.inherits(ElasticPipe, Readable);


ElasticPipe.prototype._read = function readElastic() {
  var self = this;

  if (!this.scrollId) {
    debug('Waiting for search started...');
    return this.push('');
  }

  this.client.scroll({
    scrollId: this.scrollId,
    scroll: '1m'
  })
    .then(function(res) {
      // update the scroll id
      self.scrollId = res._scroll_id;
      self.push(getData(res), 'utf8');
    })
    .catch(err.throwErrMessage)
    .done();
};


function getData(elasticResp) {
  var jsons = _.map(elasticResp.hits.hits, function(v) {
    delete v._score;
    return JSON.stringify(v);
  });

  return jsons.join('\n');
}

module.exports = ElasticPipe;
