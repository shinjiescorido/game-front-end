global.blu = require('./blu/blu-mobile');
global.$ = require('jquery');
global._ = require('lodash');
global.io = require('socket.io-client');


String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};
