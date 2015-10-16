var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var log = require('debug');

// Enable debugging
log.enable('stringarray-trans:info');

var info = log('stringarray-trans:info');
var debug = log('stringarray-trans:debug');

function ElasticArraysparamTrans(size)
{
  Transform.call(this, {objectMode: true});
  this.size = size;
  this.docBuffer = [];
  this.timer = null;
}

util.inherits(ElasticArraysparamTrans, Transform);

ElasticArraysparamTrans.prototype._transform = function transformStringArray(data, encoding, callback) {
  // store the data into docBuffer, if equal to this.size, then push it
  this.docBuffer.push(data);
  var self = this;
  if(this.timer) {
    clearTimeout(this.timer);
  }

  this.timer = setTimeout(function() {
    if (self.docBuffer.length > 0) {
      self.push(self.docBuffer);
    }
    self.docBuffer = [];
  }, 1 * 60 * 1000, 'there is no more data input, so we flush the memory');

  if (this.docBuffer.length === this.size) {
    this.push(this.docBuffer);
    this.docBuffer = [];
  }
  callback();
};

ElasticArraysparamTrans.prototype._flush = function flushStringArray(callback) {
  //push the remaining data from docBuffer
  //remove docBuffer's undefined elements, then push it.
  clearTimeout(this.timer);
  var lastBuffer = _.filter(this.docBuffer, function(element) {
    return !(typeof element === 'undefined');
  });
  this.push(lastBuffer);
  callback();
};

module.exports = ElasticArraysparamTrans;
