var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var log = require('debug');

// Enable debugging
log.enable('elastic-docflat-trans:info');

var info = log('elastic-docflat-trans:info');
var debug = log('elastic-docflat-trans:debug');

function ElasticDocflatTrans()
{
  Transform.call(this, { objectMode: true });
}

util.inherits(ElasticDocflatTrans, Transform);

ElasticDocflatTrans.prototype._transform = function transformElasticDocflat(data, encoding, callback) {
  debug('data: ' + JSON.stringify(data));
  var docs = docflat(data);
  debug('flatten: ' + JSON.stringify(docs));

  this.push(docs);
  callback();
};

function docflat(doc)
{
  delete doc._score;
  var flatten = _.assign(doc, doc._source);
  delete flatten._source;

  return flatten;
}

module.exports = ElasticDocflatTrans;
