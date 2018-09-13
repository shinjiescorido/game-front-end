import 'babel-polyfill'
import 'es5-shim';
import 'es6-shim';

global.blu = require('./blu/blu');
// global.$ = require('jquery');

$.ajaxSetup({
  	crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
});

global._ = require('lodash');
global.io = require('socket.io-client');

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

// window.console.log = ()=> {}
// global.Vue = require('vue');
// global.VueResource = require('vue-resource');
