var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var log = require('debug');

// Enable debugging
log.enable('json-addfield-parser:info');

var info = log('json-addfield-parser:info');
var debug = log('json-addfield-parser:debug');

function JsonAddFieldParser() {
  Transform.call(this, {objectMode: true});
}

util.inherits(JsonAddFieldParser, Transform);

JsonAddFieldParser.prototype._transform = function transformJsonAddField(data, encoding, callback) {
  debug('data: ' + JSON.stringify(data));
  var reg =new RegExp('(.*)\.5:00');
  //iterate field in data._source to add field with own judge
  _.forEach(data._source, function (n, key) {
    if (parseFloat(n)==n && !data._source.hasOwnProperty('#' + key) && !_.startsWith(key, '#')) {
      data._source['#' + key] = parseInt(n);
    }
  });

  data._source['doc_timestamp'] = reg.test(data._source['timestamp']) ? (data._source['timestamp']).match(reg)[1]+':30' : data._source['timestamp'] ;
  delete data._source['timestamp'];
  
  var jsons = JSON.stringify(data);

  this.push(jsons + '\n', 'utf8');
  callback();
};

JsonAddFieldParser.prototype._flush = function flushJsonAddField(callback) {
  callback();
};

module.exports = JsonAddFieldParser;
