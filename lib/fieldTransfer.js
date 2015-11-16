var moment = require('moment');
module.exports = {
  unixtimeSec: function unixtimeSec(oldfield) {
  return moment.unix(oldfield).format('YYYY-MM-DDT00:00:00.000') + 'Z';
  },
  unixtimeMsec: function unixtimeMsec(oldfield) {
  return moment.unix(oldfield/1000).format('YYYY-MM-DDT00:00:00.000') + 'Z';
  }
};

