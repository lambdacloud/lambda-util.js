var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var log = require('debug');

// Enable debugging
log.enable('stringarray-trans:info');

var info = log('stringarray-trans:info');
var debug = log('stringarray-trans:debug');

function ElasticArraysparamTrans()
{
  Transform.call(this, {objectMode: true});
}

util.inherits(ElasticArraysparamTrans, Transform);

ElasticArraysparamTrans.prototype._transform = function transformStringArray(data, encoding, callback) {
  // get the data, make it to an array(length = 50), if equal 50, then push data self

  // callback();
};

ElasticArraysparamTrans.prototype._flush = function flushStringArray(callback) {
  //flush the data
  // callback();
};

module.exports = ElasticArraysparamTrans;
