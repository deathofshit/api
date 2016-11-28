// eksisozluk/api

'use strict';

// node packages
const request = require('request-promise');

// local packages
const pkg = require('../package.json');

const github = {
  // see https://developer.github.com/v3/oauth_authorizations/#check-an-authorization
  validateToken: (accessToken, callback) => {
    const options = {
      url: 'https://api.github.com/applications/' + process.env.GITHUB_CLIENT_ID + '/tokens/' + accessToken,
      method: 'GET',
      headers: {
        'User-Agent': pkg.name + ' (' + pkg.version + ')',
        'Content-Type': 'application/json; charset=utf-8',
        authorization: 'Basic ' + new Buffer(process.env.GITHUB_CLIENT_ID + ':' + process.env.GITHUB_CLIENT_SECRET).toString('base64')
      },
      json: true
    };

    request(options)
      .then(result => {
        let valid = false;

        if (result.app.client_id === process.env.GITHUB_CLIENT_ID) {
          valid = true;
        }

        callback(valid);
      })
      .catch(err => {
        if (err) {
          callback(false, err); // handle this later
        }
        callback(false);
      });
  }
};

// export
module.exports = github;
