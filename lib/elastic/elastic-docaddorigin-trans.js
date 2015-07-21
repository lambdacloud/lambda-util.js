var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var log = require('debug');

// Enable debugging
log.enable('elastic-docaddorigin-trans:info');

var debug = log('elastic-docaddorigin-trans:debug');

function JsonAddOrigin() {
  Transform.call(this, {objectMode: true});
}

util.inherits(JsonAddOrigin, Transform);

JsonAddOrigin.prototype._transform = function transformJsonAddField(data, encoding, callback) {
  debug('data: ' + JSON.stringify(data));
  // distinguish the data source
  if (data._source['user_id']) {
    delete data._source;
    data._source = {};
    data._source['来源'] = '服务器端';

  } else if (data._source['用户ID']) {
    delete data._source;
    data._source = {};
    data._source['来源'] = '客户端';

  } else {
    delete data._source;
    data._source = {};
  }

  this.push(data);
  callback();
};

JsonAddOrigin.prototype._flush = function flushJsonAddOrigin(callback) {
  callback();
};

module.exports = JsonAddOrigin;
