var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');
var log = require('debug');

//use a global temp store the capacity of myArray
var myGlobalTemp = 0;
var myArray = new Array(100);
// Enable debugging
log.enable('stringarray-trans:info');

var info = log('stringarray-trans:info');
var debug = log('stringarray-trans:debug');

function ElasticArraysparamTrans()
{
  Transform.call(this, {objectMode: true});
}

util.inherits(ElasticArraysparamTrans, Transform);

ElasticArraysparamTrans.prototype._transform = function transformStringArray(data, encoding, callback) {
  // get the data, make it to an array(length = 100), if equal 100, then push data
  myArray[myGlobalTemp++] = data;
  if (myGlobalTemp == 100) {
    myGlobalTemp = 0;
    this.push(myArray);
    myArray = new Array(100);
    callback();
  } else {
    callback();
  }
};

ElasticArraysparamTrans.prototype._flush = function flushStringArray(callback) {
  //push the remaining data from myArray, which less than 100
  //remove myArray's undefined elements, then push it.
  var myLastArray = _.filter(myArray, function(element) {
    return !(typeof element === 'undefined');
  })
  this.push(myLastArray);
  callback();
};

module.exports = ElasticArraysparamTrans;
