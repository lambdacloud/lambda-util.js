var moment = require('moment');
module.exports = {
  unixtimeSec: function unixtimeSec(oldfield) {
  return moment.unix(oldfield).toISOString();
  },
  unixtimeMsec: function unixtimeMsec(oldfield) {
  return moment.unix(oldfield/1000).toISOString();
  }
};

