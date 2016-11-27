// eksisozluk/api

'use strict';

// node packages
const express = require('express');

// local packages
const api = require('./api');
const auth = require('./auth');
const dashboard = require('./dashboard');
const homepage = require('./homepage');
const login = require('./login');

// vars
const router = express.Router();

// routes
router.route('/').get(homepage.get);
router.route('/api').all(api.all);
router.route('/api/entries/:entry_id?').get(api.entries.get);
router.route('/api/titles/:title_id?').get(api.titles.get);
router.route('/api/users/:user_id?').get(api.users.get);
router.route('/auth').get(auth.get);
router.route('/auth/callback').get(auth.callback);
router.route('/dashboard').get(dashboard.get);
router.route('/login').get(login.get);

// export
module.exports = router;
