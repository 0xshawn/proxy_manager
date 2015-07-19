'use strict';

var exec = require('child_process').exec;


// function getRandomUnusedPort(high, low) {
//   do {

//   } while true;
//   return Math.floor(Math.random() * (high - low + 1) + low);
// }

function checkPortFree(port) {
  var cmd = 'lsof -i ' + port;
  exec(cmd, function(error, stdout, stderr) {
    if (stdout == '') {
        start_shadowsocks_with_port(port)
    }
  });
}

function start_shadowsocks_with_port(port) {

}