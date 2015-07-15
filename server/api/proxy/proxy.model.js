'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProxySchema = new Schema({
  owner: String,
  type: String,
  port: Number,
  status: Boolean
});

module.exports = mongoose.model('Proxy', ProxySchema);
