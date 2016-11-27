// eksisozluk/api

'use strict';

// node packages
const express = require('express');
const GitHub = require('passport-github');
const passport = require('passport');

// local packages
const api = require('./api');
const dashboard = require('./dashboard');
const homepage = require('./homepage');

// vars
const router = express.Router();
const GitHubStrategy = GitHub.Strategy;

// auxiliaries
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

// GitHub OAuth
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    const user = Object.assign({}, profile, {accessToken});

    return done(null, user);
  });
}));

// routes
router.route('/').get(homepage.get);
router.route('/api').all(api.all);
router.route('/api/entries/:entry_id?').get(api.entries.get);
router.route('/api/titles/:title_id?').get(api.titles.get);
router.route('/api/users/:user_id?').get(api.users.get);
router.route('/auth').get(passport.authenticate('github', {scope: 'user:email'}));
router.route('/auth/callback').get(passport.authenticate('github', {successRedirect: '/dashboard', failureRedirect: '/'}));
router.route('/dashboard').get(isAuthenticated, dashboard.get);

// export
module.exports = router;
