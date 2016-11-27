// eksisozluk/api

'use strict';

// local packages
const pkg = require('../../package.json');

// exports
exports.entries = require('./entry');
exports.titles = require('./title');
exports.users = require('./user');

exports.all = (req, res) => {
  res.status(200);
  res.json({
    version: pkg.version
  });
};
