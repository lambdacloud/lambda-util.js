'use strict';

var Writable = require('stream').Writable;
var _ = require('lodash');
var log = require('debug');
var request = require('request');
var retry = require('retry');
var util = require('util');
var moment = require('moment');

// Enable debugging
log.enable('lambdacloud-uploader:info');

var info = log('lambdacloud-uploader:info');
var debug = log('lambdacloud-uploader:debug');

var defaultOption = {
  retries: 3
};

function LambdacloudUploader(option)
{
  if (!option.token) {
    throw new Error('The token must be set in option');
  }

  this.option = _.defaults(option, defaultOption);
  Writable.call(this, { objectMode: false });

  this.stats = {
    total: 0,
    success: 0,
    timeout: 0,
    retries: 0,
    lastTimestamp: '',
    lastMessage: '',
    error: {}
  };

  var self = this;

  var startTimestamp = moment();
  this.statusBarTimer = setInterval(function() {
    process.stdout.write('\r  uploading... ' +
      ' total: ' + self.stats.total +
      ' success: ' + self.stats.success +
      ' timeout: ' + self.stats.timeout +
      ' retries: ' + self.stats.retries +
      ' duration: ' + moment().from(startTimestamp)
      );
  }, 500);

  this.on('finish', function() {
    clearTimeout(self.statusBarTimer);
    self.dumpStats();
  });
}

util.inherits(LambdacloudUploader, Writable);

LambdacloudUploader.prototype._write = function writeLambdacloud(chunk, encoding, callback) {
  var self = this;

  if (!chunk) {
    callback();
    return;
  }

  var body = {
    message: String(chunk)
  };

  var httpOptions = {
    url: 'http://api.lambdacloud.com/log/v2',
    headers: {
      'Token': this.option.token,
      'Content-type': 'application/json;charset=UTF-8',
      'User-Agent': 'LambdacloudUploader.js v0.1'
    },
    json: true,
    body: body
  };

  if (this.option.proxy) {
    httpOptions.proxy = this.option.proxy;
  }

  debug('http request option: ' + JSON.stringify(httpOptions));

  var op = retry.operation({
    retries: this.option.retries
  });

  self.stats.total++;
  self.stats.lastTimestamp = moment();
  self.stats.lastMessage = body.message;

  op.attempt(function(currentAttempt) {
    request
      .post(httpOptions, function(err, res) {
        if (op.retry(err)) {
          debug('Retry posting message ' + chunk + ' ' + currentAttempt + ' times');
          if (currentAttempt === 1) {
            self.stats.retries ++;
          }
          return;
        }

        if (err && op.mainError) {
          self.stats.timeout ++;
          console.error('Request timeout, stats: ' + JSON.stringify(self.stats));
          callback();
          return;
        }

        if (res.statusCode >= 200 && res.statusCode < 300) {
          self.stats.success ++;
        } else {
          self.stats.error[res.statusCode] = (self.stats.error[res.statusCode]) ?
            (self.stats.error[res.statusCode] + 1) : 1;
          console.error('Request error code ' + res.statusCode + ', stats: ' + JSON.stringify(self.stats));
        }

        callback();
      });
  });
};

LambdacloudUploader.prototype.dumpStats = function() {
  info('\nLambdaCloud uploading stats: ' + JSON.stringify(this.stats));
};

module.exports = LambdacloudUploader;
