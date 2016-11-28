// eksisozluk/api

'use strict';

// node packages
const _ = require('lodash');
const eksisozluk = require('eksisozluk');

// local packages
const github = require('../../utils/github');

exports.get = (req, res) => {
  const entryID = req.params.entry_id;
  const accessToken = req.query.accessToken;

  if (_.isEmpty(entryID)) {
    res.status(400);
    res.json({
      error: 'Bad Request',
      message: 'entry_id cannot be empty.'
    });
  }
  else if (_.isNaN(_.toNumber(entryID))) {
    res.status(400);
    res.json({
      error: 'Bad Request',
      message: 'entry_id is not a number.'
    });
  }
  else if (_.isEmpty(accessToken)) {
    res.status(403);
    res.json({
      error: 'Forbidden',
      message: 'accessToken is missing.'
    });
  }
  else {
    github.validateToken(accessToken, valid => {
      if (valid !== true) {
        res.status(401);
        res.json({
          error: 'Unauthorized',
          message: 'accessToken is not valid.'
        });
      }
      else {
        eksisozluk.entries.get(entryID, result => {
          res.status(result.status);
          res.json(result.data);
        });
      }
    });
  }
};
