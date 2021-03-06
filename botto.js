const _config = require('./config.js').core;
const config = (process.argv[2] === 'test' ? _config.test : _config.default);
const fs = require('fs');
const irc = require('irc');
const commandHandler = require('./commands/_commandHandler.js');
const observerHandler = require('./observers/_observerHandler.js')
const ignore = require('./core/ignore.js');
const _ = require('lodash');

/*
 * Initiate the bot and the observers
 */

const bot = new irc.Client(config.server, config.botName, {
  channels: config.channels
});

if (config.debug) {
  const chans = _.join(config.channels, ', ');
  console.log('Starting ' + config.botName + ' and joining: ' + chans);
  bot.addListener("message", function(_from, to, text, message) {
    console.log("[" + to + "] " + _from + ": " + text);
  });
}

// Register all our message listeners (either observers or commands)
bot.addListener("message", function(_from, to, text, msg) {
  try {
    ignore._isIgnoredBool(_from, msg.host, function(ignored) {
      if (!ignored) {
        // Delegate explicit commands starting with a !bang to the handler
        commandHandler.route(bot, _from, to, text, msg);
        // Delegate observables (keywords, mentions, etc) to the handler
        observerHandler.route(bot, _from, to, text, msg);
      }
    });
  } catch (e) {
    console.error(e);
    bot.say(opts.to, e.message + '; Check logs for more info');
  }
});

bot.addListener("error", function(err) {
  console.error("[ERROR] ", err);
});

