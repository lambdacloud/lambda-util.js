var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var log = require('debug');

// Enable debugging
log.enable('elastic-docparseclean-trans:info');

var debug = log('elastic-docparseclean-trans:debug');

function JsonAddFieldParser() {
  Transform.call(this, {objectMode: true});
}

util.inherits(JsonAddFieldParser, Transform);

JsonAddFieldParser.prototype._transform = function transformJsonAddField(data, encoding, callback) {
  debug('data: ' + JSON.stringify(data));
  var regEndWithTimeZone = new RegExp('(.*)\.5:00$');

  //iterate field in data._source to add field with own judge
  _.forEach(data._source, function (n, key) {
    if (parseFloat(n)==n && !data._source.hasOwnProperty('#' + key) && !_.startsWith(key, '#')) {
      data._source['#' + key] = parseInt(n);
    }
  });
  //if data._source['timestamp'] match regEndWithTimeZone then change into 30 in the end
  if (regEndWithTimeZone.test(data._source['timestamp'])) {
    data._source['timestamp'] = (data._source['timestamp']).match(regEndWithTimeZone)[1] + ':30';
  }
  //if data._source['timestamp'] can be parsed, then add data._source['doc_timestamp']
  if (Date.parse(data._source['timestamp'])) {
    data._source['doc_timestamp'] = data._source['timestamp'];
  }

  delete data._source['timestamp'];
  
  //var jsons = JSON.stringify(data);

  this.push(data);
  callback();
};

JsonAddFieldParser.prototype._flush = function flushJsonAddField(callback) {
  callback();
};

module.exports = JsonAddFieldParser;
