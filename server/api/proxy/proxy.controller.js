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

// Get list of proxys
exports.index = function(req, res) {
  Proxy.find(function(err, proxys) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, proxys);
  });
};

// Get a single proxy
exports.show = function(req, res) {
  Proxy.findById(req.params.id, function(err, proxy) {
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
exports.create = function(req, res) {
  Proxy.create(req.body, function(err, proxy) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, proxy);
  });
};

// Updates an existing proxy in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Proxy.findById(req.params.id, function(err, proxy) {
    if (err) {
      return handleError(res, err);
    }
    if (!proxy) {
      return res.send(404);
    }
    var updated = _.merge(proxy, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, proxy);
    });
  });
};

// Deletes a proxy from the DB.
exports.destroy = function(req, res) {
  Proxy.findById(req.params.id, function(err, proxy) {
    if (err) {
      return handleError(res, err);
    }
    if (!proxy) {
      return res.send(404);
    }
    proxy.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

exports.start = function(req, res) {
  Proxy.findById(req.params.id, function(err, proxy) {
    if (err) {
      return handleError(res, err);
    }
    if (!proxy) {
      return res.send(404);
    }

    // start proxy
    ProxyManage.start();

  });
};

function handleError(res, err) {
  return res.send(500, err);
}