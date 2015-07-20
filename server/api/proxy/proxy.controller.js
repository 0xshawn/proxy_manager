/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /proxys              ->  index
 * POST    /proxys              ->  create
 * GET     /proxys/:id          ->  show
 * PUT     /proxys/:id          ->  update
 * DELETE  /proxys/:id          ->  destroy
 */

'use strict';
// require for run system command

var _ = require('lodash');
var Proxy = require('./proxy.model');
var ProxyManage = require('./proxy.manage');
var User = require('../user/user.model');
var auth = require('../../auth/auth.service');

// Get list of proxys
exports.index = function (req, res) {
  Proxy.find(function (err, proxies) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, proxies);
  });
};

// get proxies of me
exports.me = function (req, res) {
  var userId = req.user._id;
  var queryParams = {};
  if (req.user.role !== 'admin') {
    queryParams = {
      owner: userId
    };
  }
  Proxy.find(queryParams, function (err, proxies) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, proxies);
  });
};

// Get a single proxy
exports.show = function (req, res) {
  Proxy.findById(req.params.id, function (err, proxy) {
    if (err) {
      return handleError(res, err);
    }
    if (!proxy) {
      return res.send(404);
    }
    return res.json(proxy);
  });
};

// Creates a new proxy in the DB.
exports.create = function (req, res) {
  var proxy = req.body;
  proxy.password = randomString(6);
  proxy.encryption = 'aes-256-cfb';
  proxy.server = process.env.PROXY_IP || '';
  Proxy.create(proxy, function (err, proxy) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, proxy);
  });
};

// Updates an existing proxy in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Proxy.findById(req.params.id, function (err, proxy) {
    if (err) {
      return handleError(res, err);
    }
    if (!proxy) {
      return res.send(404);
    }
    var updated = _.merge(proxy, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, proxy);
    });
  });
};

// Deletes a proxy from the DB.
exports.destroy = function (req, res) {
  Proxy.findById(req.params.id, function (err, proxy) {
    if (err) {
      return handleError(res, err);
    }
    if (!proxy) {
      return res.send(404);
    }
    proxy.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

exports.start = function (req, res) {
  Proxy.findById(req.params.id, function (err, proxy) {
    if (err) {
      return handleError(res, err);
    }
    if (!proxy) {
      return res.send(404);
    }

    // start proxy
    ProxyManage.start_proxy(proxy, function (port) {
      proxy.status = true;
      proxy.save();
      return res.send(200);
    });
  });
};

exports.stop = function (req, res) {
  Proxy.findById(req.params.id, function (err, proxy) {
    if (err) {
      return handleError(res, err);
    }
    if (!proxy) {
      return res.send(404);
    }

    // stop proxy
    ProxyManage.stop_proxy(proxy, function (port) {
      proxy.port = undefined;
      proxy.status = false;
      proxy.save();
      return res.send(200);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

function randomString(length) {
  var length = length || 8;
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};
