var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var Log = require('debug');

// Enable debugging
Log.enable('stringline-trans:info');

var info = Log('stringline-trans:info');
var debug = Log('stringline-trans:debug');

function StringLineTrans(indices, type)
{
  Transform.call(this, {objectMode: true});
  this.indices = indices;
  this.type = type;
}

util.inherits(StringLineTrans, Transform);

StringLineTrans.prototype._transform = function transformStringLine(data, encoding, callback) {
  // use the object after json-stream to get a new object suit for a message in ElasticSearch
  var esMessage = {};
  esMessage.index = this.indices;
  esMessage.type = this.type;
  esMessage.id = data._id;
  esMessage.body = data._source;
  this.push(esMessage);
  callback();
};

StringLineTrans.prototype._flush = function flushStringLine(callback) {
  callback();
};

module.exports = StringLineTrans;
