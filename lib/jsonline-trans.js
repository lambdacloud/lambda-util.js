var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var log = require('debug');

// Enable debugging
log.enable('jsonline-trans:info');

var info = log('jsonline-trans:info');
var debug = log('jsonline-trans:debug');

function JsonLineTrans()
{
  Transform.call(this, {objectMode: true});
}

util.inherits(JsonLineTrans, Transform);

JsonLineTrans.prototype._transform = function transformJsonLine(data, encoding, callback) {
  debug('data: ' + JSON.stringify(data));

  var jsons = JSON.stringify(data);

  this.push(jsons + '\n', 'utf8');
  callback();
};

JsonLineTrans.prototype._flush = function flushJsonLine(callback) {
  callback();
};

module.exports = JsonLineTrans;
