'use strict';

var exec = require('child_process').exec;

exports.start_proxy = function (proxy, callback) {
  proxy.port = getRandomNumber(20000, 30000);
  var cmd = 'lsof -i ' + proxy.ort;
  exec(cmd, function (error, stdout, stderr) {
    if (stdout == '') {
      manage_shadowsocks(proxy, 'start');
    } else {
      start_proxy(proxy);
    }
  });
  callback();
}

exports.stop_proxy = function (proxy, callback) {
  manage_shadowsocks(proxy, 'stop');
  callback();
}

function manage_shadowsocks(proxy, start_or_stop) {
  var pid_file = '/tmp/ss-' + proxy.port + '.pid',
    log_file = ' /tmp/ss-' + proxy.port + '.log',
    port = proxy.port,
    password = proxy.password,
    encryption = proxy.encryption,
    server = proxy.server;

  var cmd = "ssserver -s " + server +
    " -p " + port +
    " -k " + password +
    " -m " + encryption +
    " -t 1000 " +
    " --pid-file " + pid_file +
    " --log-file " + log_file +
    " -d " + start_or_stop;
  exec(cmd);
}

function getRandomNumber(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}
