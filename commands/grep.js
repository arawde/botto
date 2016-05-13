var sys = require('sys');
var exec = require('child_process').exec;
var logPath = '~/irclogs/Rizon';

module.exports = {

  call: function (opts, respond) {
    if (opts.args.length < 1) {
      return responsd('You must provide a query to grep')
    } else {
      var query = _.join(opts.args);
      return grep(query, respond);
    }
  },

  grep: function (query, channel, respond) {
    var path = logPath + "/" + channel;
    var cmd = "grep -R \"" + query + "\" " + path;
    return exec(cmd, function (err, stdout, stderr) {
      if (err) {
        return respond('[ERROR]: ' + err);
      }
      return module.exports.upload(stdout, respond);
    });
  },

  upload: function (results, respond) {
    var cmd = "echo \"" + results + "\" | nc termbin.com 9999";
    return exec(cmd, function (err, stdout, stderr) {
      if (err) {
        return respond('[ERROR]: ' + err);
      }
      return respond('Search results: ' + stdout);
    });
  }

};
