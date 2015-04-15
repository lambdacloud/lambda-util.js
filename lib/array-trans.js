var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var Log = require('debug');

// Enable debugging
Log.enable('array-trans:info');

var info = Log('array-trans:info');
var debug = Log('array-trans:debug');

function ArrayTrans()
{
  Transform.call(this, {objectMode: true});
}

util.inherits(ArrayTrans, Transform);

ArrayTrans.prototype._transform = function transformArray(data, encoding, callback) {
  var self = this;

  debug('data: ' + JSON.stringify(data));

  if (_.isArray(data)) {
    _.forEach(data, function(v) { self.push(v); });
  } else {
    this.push(data);
  }

  callback();
};

module.exports = ArrayTrans;
