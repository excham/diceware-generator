const crypto = require('crypto');
const _async = require('async');

const words = require('./words');

// Sorry for all the `.bind`s, async functions scare me!

class DicewareGenerator {
  generateDigits(callback) {
    crypto.randomBytes(16, (function(callback, err, buf) {
      var random = parseInt(buf.toString('hex'), 16).toString(7);
      random = random.replace(new RegExp('([a-zA-Z]|0|[7-9])', 'g'), '');
      random = random.substring(1, 6);
      callback(null, random)
    }).bind(null, callback))
  }

  generateWords(length, callback) {
    var tasks = [];
    for (var i = 0; i < length; i++) {
      tasks[i] = (callback) => {
        this.generateDigits(((callback, err, number) => {
          callback(err, words[number])
        }).bind(this, callback));
      }
    }
    _async.parallel(tasks, callback);
  }
}

module.exports = DicewareGenerator;
