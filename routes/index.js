// eksisozluk/api

'use strict';

// node packages
const express = require('express');

// vars
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('ekşi sözlük');
});

module.exports = router;
