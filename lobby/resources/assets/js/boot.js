import 'babel-polyfill'
import 'es5-shim';
import 'es6-shim';

global.blu = require('./blu/blu');
global.$ = require('jquery');
global._ = require('lodash');
global.io = require('socket.io-client');
global.moment = require('moment');
global.swal = require('sweetalert');

window.console.log = () =>  {}
