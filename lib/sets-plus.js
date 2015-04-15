var _ = require('lodash');

function filter(ob, callback) {
  var r = {};

  _.forEach(ob, function(v, k) {
    if (callback(v, k)) {
      r[k] = v;
    }
  });

  return r;
}

module.exports = {
  filter: filter
};
