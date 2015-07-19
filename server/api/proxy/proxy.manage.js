'use strict';

var exec = require('child_process').exec;


function getRandomNumber(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

exports.start_proxy = function() {
  var port = getRandomNumber(20000, 30000);
  var cmd = 'lsof -i ' + port;
  exec(cmd, function(error, stdout, stderr) {
    if (stdout == '') {
      manage_shadowsocks_with_port(port, 'start');
    } else {
      start_proxy();
    }
  });
}

exports.stop_proxy = function(port) {
  manage_shadowsocks_with_port(port, 'stop');
}

function manage_shadowsocks_with_port(port, start_or_stop) {
  var pid_file = '/tmp/ss-' + port + '.pid';
  var log_file = ' /tmp/ss-' + port + '.log';
  var cmd = "ssserver -s 0.0.0.0 -p " + port + " -k happy -m aes-256-cfb -t 1000 " +
    "--pid-file " + pid_file + " --log-file " + log_file + " -d " + start_or_stop;
  console.log(cmd);
  exec(cmd);
}

