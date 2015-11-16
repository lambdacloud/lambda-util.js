var moment = require('moment');
module.exports = {
  unixtimeSec: function unixtimeSec(oldfield) {
  return moment.unix(oldfield);
  },
  unixtimeMsec: function unixtimeMsec(oldfield) {
  return moment.unix(oldfield/1000);
  }
};

