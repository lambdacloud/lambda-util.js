var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var log = require('debug');

//use a global array to buffer the documents to be indexed
var docBuffer = [];
// Enable debugging
log.enable('stringarray-trans:info');

var info = log('stringarray-trans:info');
var debug = log('stringarray-trans:debug');

function ElasticArraysparamTrans(size)
{
  Transform.call(this, {objectMode: true});
  this.size = size;
}

util.inherits(ElasticArraysparamTrans, Transform);

ElasticArraysparamTrans.prototype._transform = function transformStringArray(data, encoding, callback) {
  // get the data, make it to an array(length = this.size), if equal this.size, then push data
  docBuffer.push(data);
  if (docBuffer.length === this.size) {
    this.push(docBuffer);
    docBuffer = [];
  }
  callback();
};

ElasticArraysparamTrans.prototype._flush = function flushStringArray(callback) {
  //push the remaining data from docBuffer, which less than this.size
  //remove docBuffer's undefined elements, then push it.
  var myLastArray = _.filter(docBuffer, function(element) {
    return !(typeof element === 'undefined');
  })
  this.push(myLastArray);
  callback();
};

module.exports = ElasticArraysparamTrans;
