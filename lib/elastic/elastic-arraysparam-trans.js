var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var Log = require('debug');

// Enable debugging
Log.enable('stringlines:info');

var info = Log('stringlines:info');
var debug = Log('stringlines:debug');

function StringArrayTrans()
{
  Transform.call(this, {objectMode: true});
}

util.inherits(StringArrayTrans, Transform);

StringArrayTrans.prototype._transform = function transformStringArray(data, encoding, callback) {
  // get the data, make it to an array(lengt = 50), if equal 50, then push data self
  // callback();
};

StringArrayTrans.prototype._flush = function flushStringArray(callback) {
  //flush the data
  // callback();
};

module.exports = StringArrayTrans;
