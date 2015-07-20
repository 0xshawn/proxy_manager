'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProxySchema = new Schema({
  owner: Schema.Types.ObjectId,
  summary: String,
  type: String,
  port: Number,
  status: Boolean,
  command: String,
  password: String,
  encryption: String,
  server: String
});

module.exports = mongoose.model('Proxy', ProxySchema);
