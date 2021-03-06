var needle = require('needle');
var cheerio = require('cheerio');
var _ = require('lodash');

module.exports = {

  call: function(opts, respond) {
    var match = opts.text.match(regex);

    if (match) {
      var url = match[0].trim();

      if (module.exports.isImage(url)) {
        return;
      } else {
        module.exports.parsePage(url, opts, respond);
      }
    }
  },

  isImage: function(url) {
    if (url.slice(-3) == 'jpg' || url.slice(-3) == 'png' || url.slice(-3) == 'gif') {
      return true;
    }
    return false;
  },

  parsePage: function(url, opts, respond) {
    needle.get(url, options, function(err, response) {
      if (err) {
        return console.log(err);
      } else {
        respond("[URL] " + module.exports.parseTitle(response.body));
      }
    });
  },

  parseTitle: function(html) {
    var $ = cheerio.load(html);
    var title = $('head > title').text().trim();
    title = _.truncate(title, {length: 80});
    title = title.replace(/[\r\n\t]/g, " ");
    return title;
  }
};

// Regex to find all URLs. Works with/without HTTP(S) and even without a TLD.
var expression = /[-a-zA-Z@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

// HTTP client options
var options = {
    follow: 2,
    open_timeout: 4000,
    headers: {
      'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1677.0 Safari/537.36"
    }
  }
