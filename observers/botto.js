const fs = require('fs');

module.exports = {

  call: function(opts, respond) {
    if (opts.text === 'botto') {
      return respond(me);
    }
  }

};

const me = `┈╭━━━━━━━━━━━╮┈
┈┃╭━━━╮┊╭━━━╮┃┈
╭┫┃┈🦄┈┃┊┃┈🦄┈┃┣
┃┃╰━━━╯┊╰━━━╯┃┃
╰┫╭━╮╰━━━╯╭━╮┣╯
┈┃┃┣┳┳┳┳┳┳┳┫┃┃┈
┈┃┃╰┻┻┻┻┻┻┻╯┃┃┈
┈╰━━━━━━━━━━━╯┈`
