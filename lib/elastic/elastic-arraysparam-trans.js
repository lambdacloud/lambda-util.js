var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var log = require('debug');

var i = 0;
var myArray = new Array(1000);
// Enable debugging
log.enable('stringarray-trans:info');

var info = log('stringarray-trans:info');
var debug = log('stringarray-trans:debug');

function ElasticArraysparamTrans()
{
  Transform.call(this, {objectMode: true});

  var self = this;

}

util.inherits(ElasticArraysparamTrans, Transform);

ElasticArraysparamTrans.prototype._transform = function transformStringArray(data, encoding, callback) {
  // get the data, make it to an array(length = 50), if equal 50, then push data self
  //var self = this;

  //for (var i = 0; i < 3; i++) {
  //  myArray[i] = data;
  //  //this.push(data);
  //  //console.log(data.index);
  //  callback();
  //}


  //console.log(data.body + ":--" + i);
  myArray[i++] = data;
  if (i == 1000) {
    i = 0;
    this.push(myArray);
    myArray = new Array(1000);
    callback();
  } else {
    callback();
  }
};

ElasticArraysparamTrans.prototype._flush = function flushStringArray(callback) {
  //remove myArray's undefined elements, then push it.
  var myLastArray = _.filter(myArray, function(element) {
    return !(typeof element === 'undefined');
  })
  this.push(myLastArray);
  callback();
};

module.exports = ElasticArraysparamTrans;
