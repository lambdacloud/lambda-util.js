var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var log = require('debug');

// Enable debugging
log.enable('elasticindexparam-trans:info');

var info = log('elasticindexparam-trans:info');
var debug = log('elasticindexparam-trans:debug');

function ElasticIndexparamTrans(indices, type)
{
  Transform.call(this, {objectMode: true});
  this.indices = indices;
  this.type = type;
}

util.inherits(ElasticIndexparamTrans, Transform);

ElasticIndexparamTrans.prototype._transform = function transformStringLine(data, encoding, callback) {
  // use the object after json-stream to get a new object suit for a message in ElasticSearch
  var esMessage = {
    index: (this.indices ? this.indices : data._index),
    type: (this.type ? this.type : data._type),
    id: data._id,
    body: data._source
  };
  this.push(esMessage);
  callback();
};

ElasticIndexparamTrans.prototype._flush = function flushStringLine(callback) {
  callback();
};

module.exports = ElasticIndexparamTrans;
