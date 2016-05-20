var db = require('../core/_db.js');
var _  = require('lodash');

module.exports = {

  call: function (opts, respond) {
    db.executeQuery({
      text: 'SELECT * FROM replies WHERE trigger=$1 ORDER BY RANDOM() LIMIT 1',
      values: [opts.text]
    }, function (result) {
      if (result.rows[0] && result.rows[0]['enabled'] === true) {
        module.exports.last = result.rows[0];
        return respond(result.rows[0]['reply']);
      }
    });
  },

  last: undefined

};
